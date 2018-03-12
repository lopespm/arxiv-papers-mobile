import 'rxjs'; // This is imported only for proper functioning of the corresponding unit tests
import { Observable } from 'rxjs/Observable';
import { FETCH_ARTICLES, receiveDownloadedArticles, downloadedArticlesErrorGeneric, downloadedArticlesErrorNoNetwork } from '../../actions';
import { KEY_SELECTION_DOWNLOADED } from '../../keySelection';
import { getCurrentPageOfDownloadedPapersArticlesIds, getIsConnected } from '../../../../selector';
import { reportNonFatal } from '../../../shared/errorReporter';

export default (action$, store, { state$, arxivService }) =>
    action$
        .ofType(FETCH_ARTICLES)
        .filter(action => action.payload.selectionKey === KEY_SELECTION_DOWNLOADED)
        .withLatestFrom(state$)
        .switchMap(([action, state]) => {
            const ids = getCurrentPageOfDownloadedPapersArticlesIds(state);
            if (getIsConnected(state)) {
                return arxivService.fetchByIds(ids)
                    .map(response => receiveDownloadedArticles(response.articles))
                    .catch(error => Observable.of(downloadedArticlesErrorGeneric(error))
                        .do(() => reportNonFatal('Error when fetching downloaded articles', error)));
            }
            return Observable.of(downloadedArticlesErrorNoNetwork(new Error('No connection')));
        });
