// @flow
import { combineReducers } from 'redux';
import inFlightBySelectionKey from './inFlightBySelectionKey';
import errorBySelectionKey from './errorBySelectionKey';

const reducer = {
    inFlightBySelectionKey,
    errorBySelectionKey,
};

export type State = $ObjMap<typeof reducer, <V>(v: (...args: any) => V) => V>;
export default combineReducers(reducer);