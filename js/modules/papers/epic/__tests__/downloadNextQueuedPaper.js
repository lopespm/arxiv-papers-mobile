import 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { downloadNextQueuedPaper, downloadPaperIfPermitted } from '../../actions';

const createQueuedPaper = id => ({
    id,
    idHash: `${id}-hash`,
    link: `http://arxiv.org/pdf/cond-mat/${id}`,
});

const setPaperInFlightIdAndQueuedPapers = (inFlightId, queuedPapers) => {
    jest.doMock('../../../../selector', () => ({
        providePapersTo: selector => () => selector(),
    }));

    jest.doMock('../../selector', () => ({
        getPaperDownloadInFlightId: jest.fn(() => inFlightId),
        getQueuedPapersForDownload: jest.fn(() => queuedPapers),
    }));
};

let actions$;
let state$;

beforeEach(() => {
    jest.resetModules();
    actions$ = ActionsObservable.of(downloadNextQueuedPaper());
    state$ = new BehaviorSubject();
});

it('downloads oldest queued paper', () => {
    const queuedPaper1 = createQueuedPaper('01');
    const queuedPaper2 = createQueuedPaper('02');
    setPaperInFlightIdAndQueuedPapers(null, [queuedPaper1, queuedPaper2]);

    const downloadNextQueuedPaperEpic = require('../downloadNextQueuedPaper').default;

    const results = [];
    downloadNextQueuedPaperEpic(actions$, null, { state$ }).subscribe(x => results.push(x));
    expect(results).toEqual([downloadPaperIfPermitted(queuedPaper1)]);
});

it('does not download paper when a download is in flight', () => {
    setPaperInFlightIdAndQueuedPapers('01', [createQueuedPaper('02'), createQueuedPaper('03')]);

    const downloadNextQueuedPaperEpic = require('../downloadNextQueuedPaper').default;

    const results = [];
    downloadNextQueuedPaperEpic(actions$, null, { state$ }).subscribe(x => results.push(x));
    expect(results).toEqual([]);
});

it('does not download paper when download queue is empty', () => {
    setPaperInFlightIdAndQueuedPapers(null, []);

    const downloadNextQueuedPaperEpic = require('../downloadNextQueuedPaper').default;

    const results = [];
    downloadNextQueuedPaperEpic(actions$, null, { state$ }).subscribe(x => results.push(x));
    expect(results).toEqual([]);
});