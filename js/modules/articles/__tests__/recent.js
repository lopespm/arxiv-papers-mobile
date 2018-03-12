import reducer from '../reducer';
import { fetchRecentArticles, receiveRecentArticles, recentArticlesErrorGeneric, recentArticlesErrorNoNetwork, clearRecentArticles } from '../actions';
import { getIsFetchingRecentArticles, getRecentArticles, getRecentArticlesFetchError, getRecentArticlesNextPageIndex } from '../selector';
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
    const nextState = reducer({}, fetchRecentArticles());
    expect(getIsFetchingRecentArticles(nextState)).toEqual(true);
});

it('receives fetched articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    nextState = reducer(nextState, receiveRecentArticles(articles));
    expect(getRecentArticles(nextState)).toEqual(articles);
});

it('stops fetching on generic error', () => {
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    const error = Error('A Generic Error');
    nextState = reducer(nextState, recentArticlesErrorGeneric(error));
    expect(getRecentArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getRecentArticlesFetchError(nextState).reasonGeneric).toEqual(true);
    expect(getRecentArticlesFetchError(nextState).reasonNoNetwork).toEqual(false);
    expect(getRecentArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingRecentArticles(nextState)).toEqual(false);
});

it('stops fetching on network error', () => {
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    const error = Error('A Network Error');
    nextState = reducer(nextState, recentArticlesErrorNoNetwork(error));
    expect(getRecentArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getRecentArticlesFetchError(nextState).reasonGeneric).toEqual(false);
    expect(getRecentArticlesFetchError(nextState).reasonNoNetwork).toEqual(true);
    expect(getRecentArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingRecentArticles(nextState)).toEqual(false);
});

it('clears articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    nextState = reducer(nextState, receiveRecentArticles(articles));
    nextState = reducer(nextState, clearRecentArticles());
    expect(getRecentArticles(nextState)).toEqual([]);
});

it('gets next page start index', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    nextState = reducer(nextState, receiveRecentArticles(articles));
    expect(getRecentArticlesNextPageIndex(nextState)).toEqual(2);
});

it('resets next page start index on clear articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, fetchRecentArticles());
    nextState = reducer(nextState, receiveRecentArticles(articles));
    nextState = reducer(nextState, clearRecentArticles());
    expect(getRecentArticlesNextPageIndex(nextState)).toEqual(0);
});
