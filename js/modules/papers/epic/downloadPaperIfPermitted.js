import { DOWNLOAD_PAPER_IF_PERMITTED, downloadPaper, downloadPaperNotAllowed } from '../actions';
import { RECEIVE_STORAGE_PERMISSION_GRANT, requestStoragePermission } from '../../permission/actions';
import forkEpic from '../../shared/epic/forkEpic';
import requestStoragePermissionEpic from '../../permission/requestStoragePermissionEpic';

export default (action$, store, dependencies) => action$
    .ofType(DOWNLOAD_PAPER_IF_PERMITTED)
    .map(action => action.payload.queuedPaper)
    .mergeMap(queuedPaper =>
        forkEpic(requestStoragePermissionEpic, store, dependencies, requestStoragePermission())
            .map((actionPermissionGrant) => {
                if (actionPermissionGrant.type === RECEIVE_STORAGE_PERMISSION_GRANT &&
                    actionPermissionGrant.payload.granted) {
                    return downloadPaper(queuedPaper);
                }
                return downloadPaperNotAllowed(queuedPaper);
            }));

