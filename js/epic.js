import { combineEpics } from 'redux-observable';
import articles from './modules/articles/epic';
import papers from './modules/papers/epic';
import donations from './modules/donations/epic';

export default combineEpics(
    articles,
    papers,
    donations,
);
