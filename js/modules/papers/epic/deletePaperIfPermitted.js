import { DELETE_PAPER_IF_PERMITTED, deletePaper, deletePaperNotAllowed } from '../actions';
import { RECEIVE_STORAGE_PERMISSION_GRANT, requestStoragePermission } from '../../permission/actions';
import requestStoragePermissionEpic from '../../permission/requestStoragePermissionEpic';
import forkEpic from '../../shared/epic/forkEpic';

export default (action$, store, dependencies) => action$
    .ofType(DELETE_PAPER_IF_PERMITTED)
    .mergeMap(action =>
        forkEpic(requestStoragePermissionEpic, store, dependencies, requestStoragePermission())
            .map((actionPermissionGrant) => {
                if (actionPermissionGrant.type === RECEIVE_STORAGE_PERMISSION_GRANT &&
                        actionPermissionGrant.payload.granted) {
                    return deletePaper(action.payload.id);
                }
                return deletePaperNotAllowed(action.payload.id);
            }));
