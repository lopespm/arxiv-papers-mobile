import reducer from '../reducer';
import {
    enqueueArticlePaperForDownload, downloadPaper, downloadPaperNotAllowed,
    receiveDownloadedPaper, deletePaperSuccess, downloadPaperErrorGeneric, downloadPaperErrorNoNetwork,
} from '../actions';
import { getDownloadedPapers, getQueuedPapersForDownload, getPaperDownloadInFlightId } from '../selector';

const createQueuedPaper = id => ({
    id,
    idHash: `${id}-hash`,
    link: `http://arxiv.org/pdf/cond-mat/${id}`,
});

const createReceivedPaper = (id, idHash) => ({
    id,
    idHash,
    path: `http://arxiv.org/pdf/cond-mat/${id}`,
});

let queuedPaper1;
let queuedPaper2;
let receivedPaper1;
beforeEach(function () {
    queuedPaper1 = createQueuedPaper('01');
    queuedPaper2 = createQueuedPaper('02');
    receivedPaper1 = createReceivedPaper(queuedPaper1.id, queuedPaper1.idHash);
    receivedPaper2 = createReceivedPaper(queuedPaper2.id, queuedPaper2.idHash);
});

it('enqueues paper', () => {
    const nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper1]);
});

it('enqueues multiple papers', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper1, queuedPaper2]);
});

it('dequeues paper on download', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper2]);
});

it('dequeues paper on generic error', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaperErrorGeneric(Error('Error when downloading paper'), queuedPaper1));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper2]);
});

it('dequeues paper on no network error', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaperErrorNoNetwork(Error('No connection error'), queuedPaper1));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper2]);
});

it('dequeues paper when not allowed', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaperNotAllowed(queuedPaper1));
    expect(getQueuedPapersForDownload(nextState)).toEqual([queuedPaper2]);
});

it('stops download on generic error', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    nextState = reducer(nextState, downloadPaperErrorGeneric(Error('Error when downloading paper'), queuedPaper1.id));
    expect(getPaperDownloadInFlightId(nextState)).toEqual(null);
});

it('stops download on no network error', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    nextState = reducer(nextState, downloadPaperErrorNoNetwork(Error('No connection error'), queuedPaper1.id));
    expect(getPaperDownloadInFlightId(nextState)).toEqual(null);
});

it('downloads paper', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    expect(getPaperDownloadInFlightId(nextState)).toEqual(queuedPaper1.id);
});

it('receives paper download', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    nextState = reducer(nextState, receiveDownloadedPaper(receivedPaper1));
    expect(getPaperDownloadInFlightId(nextState)).toEqual(null);
    expect(getDownloadedPapers(nextState)).toEqual([receivedPaper1]);
});

it('removes successfuly deleted paper from downloaded papers', () => {
    let nextState = reducer({}, enqueueArticlePaperForDownload(queuedPaper1));
    nextState = reducer(nextState, enqueueArticlePaperForDownload(queuedPaper2));
    nextState = reducer(nextState, downloadPaper(queuedPaper1));
    nextState = reducer(nextState, receiveDownloadedPaper(receivedPaper1));
    nextState = reducer(nextState, downloadPaper(queuedPaper2));
    nextState = reducer(nextState, receiveDownloadedPaper(receivedPaper2));
    nextState = reducer(nextState, deletePaperSuccess(receivedPaper1.id));
    expect(getDownloadedPapers(nextState)).toEqual([receivedPaper2]);
});
