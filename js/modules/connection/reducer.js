// @flow
import { CONNECTION_ONLINE, CONNECTION_OFFLINE } from './actions';
import type { Action } from './actions';

export type State = {
    +isConnected: ?boolean
}

const initialState = {
    isConnected: undefined,
};
export default function connectionStatus(state: State = initialState, action: Action): State {
    switch (action.type) {
        case CONNECTION_ONLINE:
            return {
                isConnected: true,
            };
        case CONNECTION_OFFLINE:
            return {
                isConnected: false,
            };
    }
    return state;
}
