// @flow
import type { QueuedPaper, ReceivedPaper, PaperId } from './paper';

export const ENQUEUE_PAPER_DOWNLOAD = 'ENQUEUE_PAPER_DOWNLOAD';
export const DOWNLOAD_NEXT_QUEUED_PAPER = 'DOWNLOAD_NEXT_QUEUED_PAPER';

export const DOWNLOAD_PAPER_IF_PERMITTED = 'DOWNLOAD_PAPER_IF_PERMITTED';
export const DOWNLOAD_PAPER = 'DOWNLOAD_PAPER';
export const RECEIVE_DOWNLOADED_PAPER = 'RECEIVE_DOWNLOADED_PAPER';
export const DOWNLOAD_PAPER_ERROR_GENERIC = 'DOWNLOAD_PAPER_ERROR_GENERIC';
export const DOWNLOAD_PAPER_ERROR_NO_NETWORK = 'DOWNLOAD_PAPER_ERROR_NO_NETWORK';
export const DOWNLOAD_PAPER_NOT_ALLOWED = 'DOWNLOAD_PAPER_NOT_ALLOWED';

export const DELETE_PAPER = 'DELETE_PAPER';
export const DELETE_PAPER_IF_PERMITTED = 'DELETE_PAPER_IF_PERMITTED';
export const DELETE_PAPER_SUCCESS = 'DELETE_PAPER_SUCCESS';
export const DELETE_PAPER_ERROR = 'DELETE_PAPER_ERROR';
export const DELETE_PAPER_NOT_ALLOWED = 'DELETE_PAPER_NOT_ALLOWED';

export type Action = {|
    +type: 'DOWNLOAD_NEXT_QUEUED_PAPER',
|} | {|
    +type: 'ENQUEUE_PAPER_DOWNLOAD' | 'DOWNLOAD_PAPER_IF_PERMITTED' | 'DOWNLOAD_PAPER' | 'DOWNLOAD_PAPER_NOT_ALLOWED',
    +payload: {|
        +queuedPaper: QueuedPaper,
    |}
|} | {|
    +type: 'DOWNLOAD_PAPER_ERROR_GENERIC' | 'DOWNLOAD_PAPER_ERROR_NO_NETWORK',
    +payload: {|
        +queuedPaper: QueuedPaper,
        +error: Error,
    |}
|} | {|
    +type: 'RECEIVE_DOWNLOADED_PAPER',
    +payload: {|
        receivedPaper: ReceivedPaper,
    |}
|} | {|
    +type: 'DELETE_PAPER' | 'DELETE_PAPER_IF_PERMITTED' | 'DELETE_PAPER_NOT_ALLOWED' | 'DELETE_PAPER_SUCCESS',
    +payload: {|
        +id: PaperId,
    |}
|} | {|
    +type: 'DELETE_PAPER_ERROR',
    +payload: {|
        +id: PaperId,
        +error: Error,
    |}
|}

export const enqueueArticlePaperForDownload = (queuedPaper: QueuedPaper): Action => ({
    type: ENQUEUE_PAPER_DOWNLOAD,
    payload: {
        queuedPaper,
    },
});

export const downloadNextQueuedPaper = (): Action => ({
    type: DOWNLOAD_NEXT_QUEUED_PAPER,
});

export const downloadPaperIfPermitted = (queuedPaper: QueuedPaper): Action => ({
    type: DOWNLOAD_PAPER_IF_PERMITTED,
    payload: {
        queuedPaper,
    },
});

export const downloadPaperNotAllowed = (queuedPaper: QueuedPaper): Action => ({
    type: DOWNLOAD_PAPER_NOT_ALLOWED,
    payload: {
        queuedPaper,
    },
});

export const downloadPaper = (queuedPaper: QueuedPaper): Action => ({
    type: DOWNLOAD_PAPER,
    payload: {
        queuedPaper,
    },
});

export const receiveDownloadedPaper = (receivedPaper: ReceivedPaper): Action => ({
    type: RECEIVE_DOWNLOADED_PAPER,
    payload: {
        receivedPaper,
    },
});

export const downloadPaperErrorGeneric = (error: Error, queuedPaper: QueuedPaper): Action => ({
    type: DOWNLOAD_PAPER_ERROR_GENERIC,
    payload: {
        error,
        queuedPaper,
    },
});

export const downloadPaperErrorNoNetwork = (error: Error, queuedPaper: QueuedPaper): Action => ({
    type: DOWNLOAD_PAPER_ERROR_NO_NETWORK,
    payload: {
        error,
        queuedPaper,
    },
});

export const deletePaperIfPermitted = (id: PaperId): Action => ({
    type: DELETE_PAPER_IF_PERMITTED,
    payload: {
        id,
    },
});

export const deletePaperNotAllowed = (id: PaperId): Action => ({
    type: DELETE_PAPER_NOT_ALLOWED,
    payload: {
        id,
    },
});

export const deletePaper = (id: PaperId): Action => ({
    type: DELETE_PAPER,
    payload: {
        id,
    },
});

export const deletePaperSuccess = (id: PaperId): Action => ({
    type: DELETE_PAPER_SUCCESS,
    payload: {
        id,
    },
});

export const deletePaperError = (error: Error, id: PaperId): Action => ({
    type: DELETE_PAPER_ERROR,
    payload: {
        error,
        id,
    },
});