// @flow
import { RECEIVED_ARTICLES, DELETE_ARTICLE, CLEAR_ARTICLES } from '../actions';
import { KEY_SELECTION_RECENT, KEY_SELECTION_SEARCH, KEY_SELECTION_DOWNLOADED } from '../keySelection';
import type { Action } from '../actions';
import type { KeySelection } from '../keySelection';
import type { ArticleId } from '../article';

export type State = {
    +[KeySelection]: {
        +ids: $ReadOnlyArray<ArticleId>,
        +nextPageIndex: number,
    }
}

const initialSelectionState = selectionKey => ({
    [selectionKey]: {
        ids: [],
        nextPageIndex: 0,
    },
});

const initialState = {
    ...initialSelectionState(KEY_SELECTION_RECENT),
    ...initialSelectionState(KEY_SELECTION_SEARCH),
    ...initialSelectionState(KEY_SELECTION_DOWNLOADED),
};

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case RECEIVED_ARTICLES:
            const receiveArticles = action.payload.articles;
            const receivedArticlesIds = receiveArticles.map(article => article.id);
            return {
                ...state,
                [action.payload.selectionKey]: {
                    ids: state[action.payload.selectionKey].ids.concat(receivedArticlesIds),
                    nextPageIndex: state[action.payload.selectionKey].nextPageIndex + receiveArticles.length,
                },
            };

        case DELETE_ARTICLE:
            const targetArticleId = action.payload.id;
            const idsWithoutDeletedArticle = state[action.payload.selectionKey].ids.filter(id => id !== targetArticleId);
            return {
                ...state,
                [action.payload.selectionKey]: {
                    ids: idsWithoutDeletedArticle,
                    nextPageIndex: idsWithoutDeletedArticle.length,
                },
            };

        case CLEAR_ARTICLES:
            return {
                ...state,
                ...initialSelectionState(action.payload.selectionKey),
            };

        default:
            return state;
    }
};
