import { combineEpics } from 'redux-observable';
import downloaded from './downloaded';
import recent from './recent';
import search from './search';

export default combineEpics(
    downloaded,
    recent,
    search,
);
