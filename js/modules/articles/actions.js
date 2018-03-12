// @flow
import { KEY_SELECTION_RECENT, KEY_SELECTION_SEARCH, KEY_SELECTION_DOWNLOADED } from './keySelection';
import type { KeySelection } from './keySelection';
import type { Article, ArticleId } from './article';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const RECEIVED_ARTICLES = 'RECEIVED_ARTICLES';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const ARTICLES_ERROR_GENERIC = 'ARTICLES_ERROR_GENERIC';
export const ARTICLES_ERROR_NO_NETWORK = 'ARTICLES_ERROR_NO_NETWORK';
export const CLEAR_ARTICLES = 'CLEAR_ARTICLES';

export type Action = {|
    +type: 'FETCH_ARTICLES',
    +payload: {|
        +selectionKey: 'KEY_SELECTION_RECENT' | 'KEY_SELECTION_DOWNLOADED',
    |} | {|
        +selectionKey: 'KEY_SELECTION_SEARCH',
        +query: string,
    |}
|} | {|
    +type: 'CLEAR_ARTICLES',
    +payload: {
        +selectionKey: KeySelection,
    },
|} | {|
    +type: 'DELETE_ARTICLE',
    +payload: {
        +selectionKey: KeySelection,
        +id: ArticleId,
    },
|} | {|
    +type: 'RECEIVED_ARTICLES',
    +payload: {
        +selectionKey: KeySelection,
        +articles: $ReadOnlyArray<Article>,
    },
|} | {|
    +type: 'ARTICLES_ERROR_GENERIC' | 'ARTICLES_ERROR_NO_NETWORK',
    +payload: {
        +selectionKey: KeySelection,
        +error: Error,
    },
|};

const receiveArticles = (selectionKey: KeySelection, articles: Array<Article>): Action => ({
    type: RECEIVED_ARTICLES,
    payload: {
        selectionKey,
        articles,
    },
});

const fetchArticles = (selectionKey): Action => ({
    type: FETCH_ARTICLES,
    payload: {
        selectionKey,
    },
});

const clearArticles = (selectionKey: KeySelection): Action => ({
    type: CLEAR_ARTICLES,
    payload: {
        selectionKey,
    },
});

const articlesErrorGeneric = (selectionKey: KeySelection, error: Error): Action => ({
    type: ARTICLES_ERROR_GENERIC,
    payload: {
        selectionKey,
        error,
    },
});

const articlesErrorNoNetwork = (selectionKey: KeySelection, error: Error): Action => ({
    type: ARTICLES_ERROR_NO_NETWORK,
    payload: {
        selectionKey,
        error,
    },
});


export const fetchRecentArticles = (): Action => fetchArticles(KEY_SELECTION_RECENT);
export const receiveRecentArticles = (articles: Array<Article>): Action => receiveArticles(KEY_SELECTION_RECENT, articles);
export const clearRecentArticles = (): Action => clearArticles(KEY_SELECTION_RECENT);
export const recentArticlesErrorGeneric = (error: Error): Action => articlesErrorGeneric(KEY_SELECTION_RECENT, error);
export const recentArticlesErrorNoNetwork = (error: Error): Action => articlesErrorNoNetwork(KEY_SELECTION_RECENT, error);

export function searchArticles(query: string): Action {
    return {
        type: FETCH_ARTICLES,
        payload: {
            selectionKey: KEY_SELECTION_SEARCH,
            query,
        },
    };
}
export const receiveSearchArticles = (articles: Array<Article>): Action => receiveArticles(KEY_SELECTION_SEARCH, articles);
export const clearSearchArticles = (): Action => clearArticles(KEY_SELECTION_SEARCH);
export const searchArticlesErrorGeneric = (error: Error): Action => articlesErrorGeneric(KEY_SELECTION_SEARCH, error);
export const searchArticlesErrorNoNetwork = (error: Error): Action => articlesErrorNoNetwork(KEY_SELECTION_SEARCH, error);

export const fetchDownloadedArticles = (): Action => fetchArticles(KEY_SELECTION_DOWNLOADED);
export const receiveDownloadedArticles = (articles: Array<Article>): Action => receiveArticles(KEY_SELECTION_DOWNLOADED, articles);
export const clearDownloadedArticles = (): Action => clearArticles(KEY_SELECTION_DOWNLOADED);
export const downloadedArticlesErrorGeneric = (error: Error): Action => articlesErrorGeneric(KEY_SELECTION_DOWNLOADED, error);
export const downloadedArticlesErrorNoNetwork = (error: Error): Action => articlesErrorNoNetwork(KEY_SELECTION_DOWNLOADED, error);

export const deleteDownloadedArticle = (id: ArticleId): Action => ({
    type: DELETE_ARTICLE,
    payload: {
        selectionKey: KEY_SELECTION_DOWNLOADED,
        id,
    },
});
