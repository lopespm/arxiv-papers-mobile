import 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { searchArticlesErrorNoNetwork, searchArticles, receiveSearchArticles } from '../../../actions';
import { create as createDomainArticle } from '../../../article';

let state$;
const arxivService = jest.fn();

const createArticle = id => createDomainArticle({ id });

const setIsConnected = (isConnected) => {
    jest.doMock('../../../../../selector', () => ({
        getIsConnected: jest.fn(() => isConnected),
        provideArticlesTo: selector => () => selector(),
    }));
};

const setReceivedArticles = (articles) => {
    arxivService.searchArticles = jest.fn(() => Observable.of({ articles }));
};

beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../../shared/errorReporter', () => ({ reportNonFatal: jest.fn() }));
    jest.doMock('../../../selector', () => ({ getSearchArticlesNextPageIndex: jest.fn() }));
    state$ = new BehaviorSubject();
});

it('fetches articles', () => {
    setIsConnected(true);
    const actions$ = ActionsObservable.of(searchArticles('a query'));
    const receivedArticles = [createArticle('01'), createArticle('02')];
    setReceivedArticles(receivedArticles);

    const results = [];
    const searchArticlesEpic = require('../fetchSearchArticles').default;
    searchArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results).toEqual([receiveSearchArticles(receivedArticles)]);
});

it('does not fetch articles when connection is offline', () => {
    setIsConnected(false);
    const actions$ = ActionsObservable.of(searchArticles('a query'));
    setReceivedArticles([createArticle('01'), createArticle('02')]);

    const results = [];
    const searchArticlesEpic = require('../fetchSearchArticles').default;
    searchArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results[0].type).toEqual(searchArticlesErrorNoNetwork().type);
});

it('does not fetch articles when query is empty', () => {
    setIsConnected(true);
    const actions$ = ActionsObservable.of(searchArticles(''));
    const receivedArticles = [createArticle('01'), createArticle('02')];
    setReceivedArticles(receivedArticles);

    const results = [];
    const searchArticlesEpic = require('../fetchSearchArticles').default;
    searchArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results).toEqual([]);
});