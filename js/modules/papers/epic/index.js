import { combineEpics } from 'redux-observable';
import downloadNextQueuedPaper from './downloadNextQueuedPaper';
import downloadPaperIfPermitted from './downloadPaperIfPermitted';
import downloadPaper from './downloadPaper';
import deletePaper from './deletePaper';
import deletePaperIfPermitted from './deletePaperIfPermitted';
import showSnackbarOnError from './showSnackbarOnError';

export default combineEpics(
    downloadNextQueuedPaper,
    downloadPaperIfPermitted,
    downloadPaper,
    deletePaper,
    deletePaperIfPermitted,
    showSnackbarOnError,
);
