import { combineEpics } from 'redux-observable';
import { showSnackbar } from '../../snackbar/actions';
import { DOWNLOAD_PAPER_ERROR_GENERIC, DOWNLOAD_PAPER_ERROR_NO_NETWORK, DELETE_PAPER_ERROR } from '../actions';

const downloadPaperGeneric = action$ =>
    action$
        .ofType(DOWNLOAD_PAPER_ERROR_GENERIC)
        .map(() => showSnackbar('An error occurred when downloading the paper'));

const downloadPaperNoNetwork = action$ =>
    action$
        .ofType(DOWNLOAD_PAPER_ERROR_NO_NETWORK)
        .map(() => showSnackbar('Could not download paper, network not available'));

const deletePaper = action$ =>
    action$
        .ofType(DELETE_PAPER_ERROR)
        .map(() => showSnackbar('An error occurred when deleting the paper'));

export default combineEpics(
    downloadPaperGeneric,
    downloadPaperNoNetwork,
    deletePaper,
);
