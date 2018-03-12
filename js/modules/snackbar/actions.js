// @flow
import SnackbarCommand from 'react-native-snackbar';
import uniqueId from 'uuid/v4';

export const SHOW_SNACK = 'SHOW_SNACK';

export type Action = {|
    +type: 'SHOW_SNACK',
    +payload: {
        +id: string,
        +title: string,
        +duration: number,
    }
|}

export const showSnackbar = (title: string, duration: number = SnackbarCommand.LENGTH_SHORT): Action => ({
    type: SHOW_SNACK,
    payload: { id: uniqueId(), title, duration },
});
