// @flow
import { RECEIVED_ARTICLES, DELETE_ARTICLE, CLEAR_ARTICLES } from '../actions';
import type { State as IdsBySelectionKey } from './idsBySelectionKey';
import type { Action } from '../actions';
import type { Article, ArticleId } from '../article';

export type State = {
    +[ArticleId]: Article,
};

export default (state: State = {}, action: Action, nextIdsBySelectionKey: IdsBySelectionKey): State => {
    const allSelectionsIds = () => Object.values(nextIdsBySelectionKey).reduce((accumulator, target) => accumulator.concat(target.ids), []);
    const removeUnunedArticles = () => allSelectionsIds().reduce((accumulator, articleId) => ({ ...accumulator, [articleId]: state[articleId] }), {});

    switch (action.type) {
    case RECEIVED_ARTICLES:
        const receivedArticles = action.payload.articles;
        return {
            ...state,
            ...receivedArticles.reduce((accumulator, article) => ({ ...accumulator, [article.id]: article }), {}),
        };
    case DELETE_ARTICLE:
    case CLEAR_ARTICLES:
        return removeUnunedArticles();
    default:
        return state;
    }
};
