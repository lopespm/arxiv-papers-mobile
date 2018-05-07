import { combineEpics } from 'redux-observable';
import articles from './modules/articles/epic';
import papers from './modules/papers/epic';

export default combineEpics(
    articles,
    papers,
);
