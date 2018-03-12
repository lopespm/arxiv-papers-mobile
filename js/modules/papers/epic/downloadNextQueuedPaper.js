import { DOWNLOAD_NEXT_QUEUED_PAPER, ENQUEUE_PAPER_DOWNLOAD, downloadPaperIfPermitted } from '../actions';
import { getPaperDownloadInFlightId, getQueuedPapersForDownload } from '../selector';
import { providePapersTo } from '../../../selector';

export default (action$, store, { state$ }) =>
    action$
        .ofType(DOWNLOAD_NEXT_QUEUED_PAPER, ENQUEUE_PAPER_DOWNLOAD)
        .withLatestFrom(state$)
        .filter(([action, state]) => !providePapersTo(getPaperDownloadInFlightId)(state))
        .map(([action, state]) => providePapersTo(getQueuedPapersForDownload)(state))
        .filter(queuedPapers => queuedPapers.length > 0)
        .map(queuedPapers => queuedPapers[0])
        .map(nextQueuedPaper => downloadPaperIfPermitted(nextQueuedPaper));
