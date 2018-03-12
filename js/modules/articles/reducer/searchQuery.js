// @flow
import { FETCH_ARTICLES, CLEAR_ARTICLES } from '../actions';
import { KEY_SELECTION_SEARCH } from '../keySelection';
import type { Action } from '../actions';

export type State = string;

const initialState = '';
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case FETCH_ARTICLES:
            if (action.payload.selectionKey === KEY_SELECTION_SEARCH) {
                return action.payload.query;
            }
            break;
        case CLEAR_ARTICLES:
            if (action.payload.selectionKey === KEY_SELECTION_SEARCH) {
                return initialState;
            }
            break;
    }
    return state;
};
