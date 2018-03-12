// @flow
import type { ArticleId } from '../articles/article'

export const NAVIGATE_BACK = 'NAVIGATE_BACK';
export const NAVIGATE_SEARCH = 'NAVIGATE_SEARCH';
export const NAVIGATE_DETAILS = 'NAVIGATE_DETAILS';

export type Action = {|
    +type: 'NAVIGATE_BACK' | 'PURCHASE_TEA_SUCCESS',
|} | {|
    +type: 'NAVIGATE_SEARCH',
    +payload: {|
        +query: string,
    |}
|} | {|
    +type: 'NAVIGATE_DETAILS',
    +payload: {|
        +articleId: ArticleId,
    |}
|}

export const navigateBack = (): Action => ({
    type: NAVIGATE_BACK,
});

export const navigateToSearch = (query: string): Action => ({
    type: NAVIGATE_SEARCH,
    payload: {
        query,
    },
});

export const navigateToDetails = (articleId: ArticleId): Action => ({
    type: NAVIGATE_DETAILS,
    payload: {
        articleId,
    },
});
