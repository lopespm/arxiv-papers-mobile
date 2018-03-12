// @flow
import type { State } from './reducer';

export const getSelectedArticleIdParameter = (state: State, props: any) => props.navigation.state.params.articleId;
export const getSearchQueryParameter = (state: State, props: any) => props.navigation.state.params.query;
