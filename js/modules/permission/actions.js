// @flow
export const REQUEST_STORAGE_PERMISSION = 'REQUEST_STORAGE_PERMISSION';
export const RECEIVE_STORAGE_PERMISSION_GRANT = 'RECEIVE_STORAGE_PERMISSION_GRANT';
export const REQUEST_STORAGE_PERMISSION_ERROR = 'REQUEST_STORAGE_PERMISSION_ERROR';

export type Action = {|
    +type: 'REQUEST_STORAGE_PERMISSION',
|} | {|
    +type: 'RECEIVE_STORAGE_PERMISSION_GRANT',
    +payload: {|
        +granted: boolean,
    |}
|} | {|
    +type: 'REQUEST_STORAGE_PERMISSION_ERROR',
    +payload: {|
        +error: Error,
    |}
|}

export const requestStoragePermission = (): Action => ({
    type: REQUEST_STORAGE_PERMISSION,
});

export const receiveStoragePermissionGrant = (granted: boolean): Action => ({
    type: RECEIVE_STORAGE_PERMISSION_GRANT,
    payload: {
        granted,
    },
});

export const requestStoragePermissionError = (error: Error): Action => ({
    type: REQUEST_STORAGE_PERMISSION_ERROR,
    payload: {
        error,
    },
});