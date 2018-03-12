import reducer from '../reducer';
import { fetchDownloadedArticles, receiveDownloadedArticles, downloadedArticlesErrorGeneric, downloadedArticlesErrorNoNetwork, clearDownloadedArticles, deleteDownloadedArticle } from '../actions';
import { getIsFetchingDownloadedArticles, getDownloadedArticles, getDownloadedArticlesFetchError, getDownloadedArticlesNextPageIndex } from '../selector';
import { create as createDomainArticle } from '../article';

const createArticle = id => createDomainArticle({
    id,
    title: `Title ${id}`,
    summary: `Summary ${id}`,
    authors: ['Author 1', 'Author 2'],
    published: '2001-02-28T20:12:09Z',
    updated: '2001-02-28T20:12:09Z',
    linkWebPage: `http://arxiv.org/abs/cond-mat/${id}`,
    linkPdf: `http://arxiv.org/pdf/cond-mat/${id}`,
});

it('fetches articles', () => {
    const nextState = reducer({}, fetchDownloadedArticles());
    expect(getIsFetchingDownloadedArticles(nextState)).toEqual(true);
});

it('receives fetched articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    nextState = reducer(nextState, receiveDownloadedArticles(articles));
    expect(getDownloadedArticles(nextState)).toEqual(articles);
});

it('stops fetching on generic error', () => {
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    const error = Error('A Generic Error');
    nextState = reducer(nextState, downloadedArticlesErrorGeneric(error));
    expect(getDownloadedArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getDownloadedArticlesFetchError(nextState).reasonGeneric).toEqual(true);
    expect(getDownloadedArticlesFetchError(nextState).reasonNoNetwork).toEqual(false);
    expect(getDownloadedArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingDownloadedArticles(nextState)).toEqual(false);
});

it('stops fetching on network error', () => {
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    const error = Error('A Network Error');
    nextState = reducer(nextState, downloadedArticlesErrorNoNetwork(error));
    expect(getDownloadedArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getDownloadedArticlesFetchError(nextState).reasonGeneric).toEqual(false);
    expect(getDownloadedArticlesFetchError(nextState).reasonNoNetwork).toEqual(true);
    expect(getDownloadedArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingDownloadedArticles(nextState)).toEqual(false);
});

it('clears articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    nextState = reducer(nextState, receiveDownloadedArticles(articles));
    nextState = reducer(nextState, clearDownloadedArticles());
    expect(getDownloadedArticles(nextState)).toEqual([]);
});

it('gets next page start index', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    nextState = reducer(nextState, receiveDownloadedArticles(articles));
    expect(getDownloadedArticlesNextPageIndex(nextState)).toEqual(2);
});

it('resets next page start index on clear articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    nextState = reducer(nextState, receiveDownloadedArticles(articles));
    nextState = reducer(nextState, clearDownloadedArticles());
    expect(getDownloadedArticlesNextPageIndex(nextState)).toEqual(0);
});

it('deletes article', () => {
    const article1 = createArticle('01');
    const article2 = createArticle('02');
    const article3 = createArticle('03');
    const articles = [article1, article2, article3];
    let nextState;
    nextState = reducer({}, fetchDownloadedArticles());
    nextState = reducer(nextState, receiveDownloadedArticles(articles));
    nextState = reducer(nextState, deleteDownloadedArticle('02'));
    expect(getDownloadedArticles(nextState)).toEqual([article1, article3]);
});
