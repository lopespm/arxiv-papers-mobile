// @flow
import { FETCH_ARTICLES, RECEIVED_ARTICLES, ARTICLES_ERROR_GENERIC, ARTICLES_ERROR_NO_NETWORK, CLEAR_ARTICLES } from '../../actions';
import { KEY_SELECTION_RECENT, KEY_SELECTION_SEARCH, KEY_SELECTION_DOWNLOADED } from '../../keySelection';
import type { Action } from '../../actions';
import type { KeySelection } from '../../keySelection';

export type State = {
    +[KeySelection]: boolean
}

function initialSelectionState(selectionKey: KeySelection) {
    return {
        [selectionKey]: false,
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
            return {
                ...state,
                [action.payload.selectionKey]: true,
            }
        case RECEIVED_ARTICLES:
        case ARTICLES_ERROR_GENERIC:
        case ARTICLES_ERROR_NO_NETWORK:
        case CLEAR_ARTICLES:
            return {
                ...state,
                ...initialSelectionState(action.payload.selectionKey),
            }
    }
    return state;
};
