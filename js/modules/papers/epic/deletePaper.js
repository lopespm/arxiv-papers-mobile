import { Observable } from 'rxjs/Observable';
import { DELETE_PAPER, deletePaperSuccess, deletePaperError } from '../actions';
import fileManipulation from '../../shared/native/fileManipulation';
import { providePapersTo } from '../../../selector';
import { getDownloadedPaperPath } from '../selector';
import { reportNonFatal } from '../../shared/errorReporter';

export default (action$, store, dependencies) => action$
    .ofType(DELETE_PAPER)
    .withLatestFrom(dependencies.state$)
    .map(([action, state]) => [action.payload.id, providePapersTo(getDownloadedPaperPath)(state, { targetId: action.payload.id })])
    .switchMap(([id, path]) =>
        Observable.fromPromise(fileManipulation.delete(path))
            .mergeMap(() => Observable.of(deletePaperSuccess(id)))
            .catch(error => Observable.of(deletePaperError(error, id))
                .do(() => reportNonFatal('Error when deleting paper', error))));
