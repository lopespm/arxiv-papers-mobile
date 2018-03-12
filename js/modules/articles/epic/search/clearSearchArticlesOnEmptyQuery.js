import { FETCH_ARTICLES, clearSearchArticles } from '../../actions';
import { KEY_SELECTION_SEARCH } from '../../keySelection';

export default action$ =>
    action$
        .ofType(FETCH_ARTICLES)
        .filter(action => action.payload.selectionKey === KEY_SELECTION_SEARCH)
        .filter(action => !action.payload.query)
        .map(clearSearchArticles);
