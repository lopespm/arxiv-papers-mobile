// @flow
import { SHOW_SNACK } from './actions';
import type { Action } from './actions';

export type State = {
    +id: string,
    +title: string,
    +duration: number,
}

const initialState = { id: '', title: '', duration: 0 };
export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SHOW_SNACK:
            return {
                id: action.payload.id,
                title: action.payload.title,
                duration: action.payload.duration,
            };
    }
    return state;
};
