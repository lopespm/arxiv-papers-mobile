// @flow
import { combineReducers } from 'redux';
import * as ActionTypes from './actions';
import { TEA } from './productIds';
import type { Action } from './actions';

type IsTeaPurchased = boolean;
const isTeaPurchased = (state: IsTeaPurchased = false, action: Action): IsTeaPurchased => {
    switch (action.type) {
        case ActionTypes.FETCH_PURCHASED_DONATIONS_SUCCESS:
            if(action.payload.purchasedDonationsIds.includes(TEA)) {
                return true;
            }
            return false;
        case ActionTypes.PURCHASE_TEA_SUCCESS:
            return true;
        case ActionTypes.PURCHASE_TEA_ERROR:
            return false;
    }
    return state;
};

type TeaPurchaseError = { +error: ?Error };
const initialTeaPurchaseError = {
    error: undefined,
};
const teaPurchaseError = (state: TeaPurchaseError = initialTeaPurchaseError, action: Action): TeaPurchaseError => {
    switch (action.type) {
        case ActionTypes.PURCHASE_TEA:
        case ActionTypes.PURCHASE_TEA_SUCCESS:
            return initialTeaPurchaseError;
        case ActionTypes.PURCHASE_TEA_ERROR:
            return {
                error: action.payload.error,
            };
    }
    return state;
};

const reducer = {
    isTeaPurchased,
    teaPurchaseError,
};

export type State = $ObjMap<typeof reducer, <V>(v: (...args: any) => V) => V>;
export default combineReducers(reducer);