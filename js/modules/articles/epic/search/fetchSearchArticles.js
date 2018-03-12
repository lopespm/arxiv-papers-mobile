import 'rxjs'; // This is imported only for proper functioning of the corresponding unit tests
import { Observable } from 'rxjs/Observable';
import { FETCH_ARTICLES, receiveSearchArticles, searchArticlesErrorGeneric, searchArticlesErrorNoNetwork } from '../../actions';
import { KEY_SELECTION_SEARCH } from '../../keySelection';
import { provideArticlesTo, getIsConnected } from '../../../../selector';
import { getSearchArticlesNextPageIndex } from '../../selector';
import { reportNonFatal } from '../../../shared/errorReporter';

export default (action$, store, { state$, arxivService }) => {
    const pageSize = 10;
    return action$
        .ofType(FETCH_ARTICLES)
        .filter(action => action.payload.selectionKey === KEY_SELECTION_SEARCH)
        .withLatestFrom(state$)
        .map(([action, state]) => [action.payload.query, state])
        .filter(([query, state]) => !!query)
        .switchMap(([query, state]) => {
            const startIndex = provideArticlesTo(getSearchArticlesNextPageIndex)(state);
            const isConnected = getIsConnected(state);
            if (isConnected) {
                return arxivService.searchArticles(query, startIndex, pageSize)
                    .map(response => receiveSearchArticles(response.articles))
                    .catch(error => Observable.of(searchArticlesErrorGeneric(error))
                        .do(() => reportNonFatal('Error when fetching search articles', error)));
            }
            return Observable.of(searchArticlesErrorNoNetwork(new Error('No connection')));
        });
};

