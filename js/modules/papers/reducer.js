// @flow
import { combineReducers } from 'redux';
import * as ActionTypes from './actions';
import type { Action } from './actions';
import type { QueuedPaper, ReceivedPaper, PaperId } from './paper';

type QueuedPapers = $ReadOnlyArray<QueuedPaper>;
const queued = (state: QueuedPapers = [], action: Action): QueuedPapers => {
    switch (action.type) {
        case ActionTypes.ENQUEUE_PAPER_DOWNLOAD:
            return [...state, action.payload.queuedPaper];
        case ActionTypes.DOWNLOAD_PAPER:
        case ActionTypes.DOWNLOAD_PAPER_ERROR_GENERIC:
        case ActionTypes.DOWNLOAD_PAPER_ERROR_NO_NETWORK:
        case ActionTypes.DOWNLOAD_PAPER_NOT_ALLOWED:
            const targetId = action.payload.queuedPaper.id;
            return state.filter(({ id }) => id !== targetId);
        default:
            return state;
    }
};

type InFlightId = PaperId | null;
const inFlightId = (state: InFlightId = null, action: Action): InFlightId => {
    switch (action.type) {
        case ActionTypes.DOWNLOAD_PAPER:
            return action.payload.queuedPaper.id;
        case ActionTypes.RECEIVE_DOWNLOADED_PAPER:
        case ActionTypes.DOWNLOAD_PAPER_ERROR_GENERIC:
        case ActionTypes.DOWNLOAD_PAPER_ERROR_NO_NETWORK:
        case ActionTypes.DOWNLOAD_PAPER_NOT_ALLOWED:
            return null;
    }
    return state;
};

type ReceivedPapers = $ReadOnlyArray<ReceivedPaper>;
const received = (state: ReceivedPapers = [], action: Action): ReceivedPapers => {
    switch (action.type) {
        case ActionTypes.RECEIVE_DOWNLOADED_PAPER:
            return [action.payload.receivedPaper, ...state];
        case ActionTypes.DELETE_PAPER_SUCCESS:
            const targetId = action.payload.id;
            return state.filter(({ id }) => id !== targetId);
    }
    return state;
};

type ErrorState = { +error?: Error, +errorMessage?: string };
const error = (state: ErrorState = {}, action: Action): ErrorState => {
    switch (action.type) {
        case ActionTypes.DOWNLOAD_PAPER:
            return {};
        case ActionTypes.DOWNLOAD_PAPER_ERROR_GENERIC:
        case ActionTypes.DOWNLOAD_PAPER_ERROR_NO_NETWORK:
            return {
                error: action.payload.error,
                errorMessage: action.payload.error.message,
            };
    }
    return state;
};

const reducer = {
    queued,
    inFlightId,
    received,
    error,
};

export type State = $ObjMap<typeof reducer, <V>(v: (...args: any) => V) => V>;
export default combineReducers(reducer);
