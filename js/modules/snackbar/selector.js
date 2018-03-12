// @flow
import type { State } from './reducer';

export const getSnackbarId = (state: State) => state.id;
export const getSnackbarTitle = (state: State) => state.title;
export const getSnackbarDuration = (state: State) => state.duration;