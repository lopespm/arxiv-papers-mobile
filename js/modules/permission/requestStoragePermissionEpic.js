import { PermissionsAndroid, Platform } from 'react-native';
import { Observable } from 'rxjs/Observable';

import { REQUEST_STORAGE_PERMISSION } from './actions';
import { receiveStoragePermissionGrant, requestStoragePermissionError } from './actions';

export default action$ =>
    action$
        .ofType(REQUEST_STORAGE_PERMISSION)
        .switchMap(action => {
            if (Platform.Version < 23) {
                return Observable.of(receiveStoragePermissionGrant(true));
            }
            return Observable.fromPromise(PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))
                .map(granted => receiveStoragePermissionGrant(granted === PermissionsAndroid.RESULTS.GRANTED))
                .catch(error => Observable.of(requestStoragePermissionError(error)));
        });

