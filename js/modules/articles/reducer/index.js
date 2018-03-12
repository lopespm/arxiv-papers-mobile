// @flow
import idsBySelectionKey from './idsBySelectionKey';
import byId from './byId';
import fetch from './fetch';
import searchQuery from './searchQuery';
import type { State as IdsBySelectionKey } from './idsBySelectionKey';
import type { State as ById } from './byId';
import type { State as Fetch } from './fetch';
import type { State as SearchQuery } from './searchQuery';
import type { Action } from '../actions';

export type State = {
    +idsBySelectionKey: IdsBySelectionKey,
    +byId: ById,
    +fetch: Fetch,
    +searchQuery: SearchQuery,
}

export default (state: State = {}, action: Action): State => {
    const nextIdsBySelectionKey = idsBySelectionKey(state.idsBySelectionKey, action);
    const nextById = byId(state.byId, action, nextIdsBySelectionKey);
    return {
        idsBySelectionKey: nextIdsBySelectionKey,
        byId: nextById,
        fetch: fetch(state.fetch, action),
        searchQuery: searchQuery(state.searchQuery, action),
    };
};
