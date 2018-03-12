import { Observable } from 'rxjs/Observable';
import { RECEIVE_DOWNLOADED_PAPER } from '../../../papers/actions';
import { clearDownloadedArticles, fetchDownloadedArticles } from '../../actions';

export default action$ =>
    action$
        .ofType(RECEIVE_DOWNLOADED_PAPER)
        .switchMap(action =>
            Observable.of(clearDownloadedArticles(), fetchDownloadedArticles()));
