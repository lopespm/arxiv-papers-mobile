// @flow
import { combineReducers } from 'redux';
import articles from './modules/articles/reducer';
import papers from './modules/papers/reducer';
import searchQuery from './modules/articles/reducer/searchQuery';
import donations from './modules/donations/reducer';
import snackbar from './modules/snackbar/reducer';
import navigation from './modules/navigation/reducer';
import connection from './modules/connection/reducer';

const reducer = {
    articles,
    papers,
    searchQuery,
    donations,
    snackbar,
    navigation,
    connection,
};

export type State = $ObjMap<typeof reducer, <V>(v: (...args: any) => V) => V>;
export default combineReducers(reducer);
