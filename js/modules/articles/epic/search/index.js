import { combineEpics } from 'redux-observable';
import clearSearchArticlesOnEmptyQuery from './clearSearchArticlesOnEmptyQuery';
import fetchSearchArticles from './fetchSearchArticles';

export default combineEpics(
    fetchSearchArticles,
    clearSearchArticlesOnEmptyQuery,
);
