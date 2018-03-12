import 'rxjs'; // This is imported only for proper functioning of the corresponding unit tests
import { Observable } from 'rxjs/Observable';
import { FETCH_ARTICLES, receiveRecentArticles, recentArticlesErrorGeneric, recentArticlesErrorNoNetwork } from '../../actions';
import { KEY_SELECTION_RECENT } from '../../keySelection';
import { provideArticlesTo, getIsConnected } from '../../../../selector';
import { getRecentArticlesNextPageIndex } from '../../selector';
import { reportNonFatal } from '../../../shared/errorReporter';

export default (action$, store, { state$, arxivService }) => {
    const pageSize = 10;
    return action$
        .ofType(FETCH_ARTICLES)
        .filter(action => action.payload.selectionKey === KEY_SELECTION_RECENT)
        .withLatestFrom(state$)
        .switchMap(([action, state]) => {
            const startIndex = provideArticlesTo(getRecentArticlesNextPageIndex)(state);
            if (getIsConnected(state)) {
                return arxivService.recentArticles(startIndex, pageSize)
                    .map(response => receiveRecentArticles(response.articles))
                    .catch(error => Observable.of(recentArticlesErrorGeneric(error))
                        .do(() => reportNonFatal('Error when fetching recent articles', error)));
            }
            return Observable.of(recentArticlesErrorNoNetwork(new Error('No connection')));
        });
};

