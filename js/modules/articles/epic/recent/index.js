import { combineEpics } from 'redux-observable';
import fetchRecentArticles from './fetchRecentArticles';

export default combineEpics(fetchRecentArticles);
