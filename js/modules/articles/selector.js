// @flow
import { createSelector } from 'reselect';
import { KEY_SELECTION_RECENT, KEY_SELECTION_SEARCH, KEY_SELECTION_DOWNLOADED } from './keySelection';
import type { KeySelection } from './keySelection';
import type { State } from './reducer';

export const getArticles = (state: State) => state.byId;

export const getIsFetchingDownloadedArticles = (state: State) => state.fetch.inFlightBySelectionKey[KEY_SELECTION_DOWNLOADED];
export const getIsFetchingRecentArticles = (state: State) => state.fetch.inFlightBySelectionKey[KEY_SELECTION_RECENT];
export const getIsFetchingSearchArticles = (state: State) => state.fetch.inFlightBySelectionKey[KEY_SELECTION_SEARCH];

export const getDownloadedArticlesFetchError = (state: State) => state.fetch.errorBySelectionKey[KEY_SELECTION_DOWNLOADED];
export const getRecentArticlesFetchError = (state: State) => state.fetch.errorBySelectionKey[KEY_SELECTION_RECENT];
export const getSearchArticlesFetchError = (state: State) => state.fetch.errorBySelectionKey[KEY_SELECTION_SEARCH];

export const getDownloadedArticlesNextPageIndex = (state: State) => state.idsBySelectionKey[KEY_SELECTION_DOWNLOADED].nextPageIndex;
export const getRecentArticlesNextPageIndex = (state: State) => state.idsBySelectionKey[KEY_SELECTION_RECENT].nextPageIndex;
export const getSearchArticlesNextPageIndex = (state: State) => state.idsBySelectionKey[KEY_SELECTION_SEARCH].nextPageIndex;

const getArticlesIdsWithSelectionKey = (selectionKey: KeySelection) => (state: State) => state.idsBySelectionKey[selectionKey].ids;

const getArticlesWithSelectionKey = (selectionKey: KeySelection) => createSelector(
    getArticlesIdsWithSelectionKey(selectionKey),
    getArticles,
    (articleIds, articles) => articleIds.map(id => articles[id]),
);

export const getDownloadedArticles = getArticlesWithSelectionKey(KEY_SELECTION_DOWNLOADED);
export const getRecentArticles = getArticlesWithSelectionKey(KEY_SELECTION_RECENT);
export const getSearchArticles = getArticlesWithSelectionKey(KEY_SELECTION_SEARCH);

export const getSearchQuery = (state: State) => state.searchQuery;
