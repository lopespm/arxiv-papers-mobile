// @flow
import { FETCH_ARTICLES, ARTICLES_ERROR_GENERIC, ARTICLES_ERROR_NO_NETWORK, CLEAR_ARTICLES } from '../../actions';
import { KEY_SELECTION_RECENT, KEY_SELECTION_SEARCH, KEY_SELECTION_DOWNLOADED } from '../../keySelection';
import type { Action } from '../../actions';
import type { KeySelection } from '../../keySelection';

export type State = {
    +[KeySelection]: {
        +inErrorState: boolean,
        +reasonGeneric: boolean,
        +reasonNoNetwork: boolean,
        +error: ?Error,
    }
}

function initialSelectionState(selectionKey: KeySelection) {
    return {
        [selectionKey]: {
            inErrorState: false,
            reasonGeneric: false,
            reasonNoNetwork: false,
            error: undefined,
        },
    };
}
const initialState = {
    ...initialSelectionState(KEY_SELECTION_RECENT),
    ...initialSelectionState(KEY_SELECTION_SEARCH),
    ...initialSelectionState(KEY_SELECTION_DOWNLOADED),
};
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case FETCH_ARTICLES:
        case CLEAR_ARTICLES:
            return {
                ...state,
                ...initialSelectionState(action.payload.selectionKey),
            }
        case ARTICLES_ERROR_GENERIC:
            return {
                ...state,
                [action.payload.selectionKey]: {
                    ...state[action.payload.selectionKey],
                    inErrorState: true,
                    reasonGeneric: true,
                    error: action.payload.error,
                }
            }
        case ARTICLES_ERROR_NO_NETWORK:
            return {
                ...state,
                [action.payload.selectionKey]: {
                    ...state[action.payload.selectionKey],
                    inErrorState: true,
                    reasonNoNetwork: true,
                    error: action.payload.error,
                }
            }
    }
    return state;
};
