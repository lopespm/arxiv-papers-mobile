import reducer from '../reducer';
import { searchArticles, receiveSearchArticles, searchArticlesErrorGeneric, searchArticlesErrorNoNetwork, clearSearchArticles } from '../actions';
import { getIsFetchingSearchArticles, getSearchArticles, getSearchArticlesFetchError, getSearchArticlesNextPageIndex, getSearchQuery } from '../selector';
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

it('searches articles', () => {
    const nextState = reducer({}, searchArticles('a query'));
    expect(getIsFetchingSearchArticles(nextState)).toEqual(true);
    expect(getSearchQuery(nextState)).toEqual('a query');
});

it('receives fetched articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    nextState = reducer(nextState, receiveSearchArticles(articles));
    expect(getSearchArticles(nextState)).toEqual(articles);
});

it('stops fetching on generic error', () => {
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    const error = Error('A Generic Error');
    nextState = reducer(nextState, searchArticlesErrorGeneric(error));
    expect(getSearchArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getSearchArticlesFetchError(nextState).reasonGeneric).toEqual(true);
    expect(getSearchArticlesFetchError(nextState).reasonNoNetwork).toEqual(false);
    expect(getSearchArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingSearchArticles(nextState)).toEqual(false);
});

it('stops fetching on network error', () => {
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    const error = Error('A Network Error');
    nextState = reducer(nextState, searchArticlesErrorNoNetwork(error));
    expect(getSearchArticlesFetchError(nextState).inErrorState).toEqual(true);
    expect(getSearchArticlesFetchError(nextState).reasonGeneric).toEqual(false);
    expect(getSearchArticlesFetchError(nextState).reasonNoNetwork).toEqual(true);
    expect(getSearchArticlesFetchError(nextState).error).toEqual(error);
    expect(getIsFetchingSearchArticles(nextState)).toEqual(false);
});

it('clears articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    nextState = reducer(nextState, receiveSearchArticles(articles));
    nextState = reducer(nextState, clearSearchArticles());
    expect(getSearchArticles(nextState)).toEqual([]);
});

it('gets next page start index', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    nextState = reducer(nextState, receiveSearchArticles(articles));
    expect(getSearchArticlesNextPageIndex(nextState)).toEqual(2);
});

it('resets next page start index on clear articles', () => {
    const articles = [createArticle('01'), createArticle('02')];
    let nextState;
    nextState = reducer({}, searchArticles('a query'));
    nextState = reducer(nextState, receiveSearchArticles(articles));
    nextState = reducer(nextState, clearSearchArticles());
    expect(getSearchArticlesNextPageIndex(nextState)).toEqual(0);
});
