import { combineEpics } from 'redux-observable';
import deleteDownloadedArticleOnPaperDeleted from './deleteDownloadedArticleOnPaperDeleted';
import fetchDownloadedArticles from './fetchDownloadedArticles';
import fetchDownloadedArticlesOnPaperReceived from './fetchDownloadedArticlesOnPaperReceived';

export default combineEpics(
    deleteDownloadedArticleOnPaperDeleted,
    fetchDownloadedArticles,
    fetchDownloadedArticlesOnPaperReceived,
);
