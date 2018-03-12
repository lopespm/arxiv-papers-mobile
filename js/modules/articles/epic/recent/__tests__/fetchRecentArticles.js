import 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { recentArticlesErrorNoNetwork, fetchRecentArticles, receiveRecentArticles } from '../../../actions';
import { create as createDomainArticle } from '../../../article';

let actions$;
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
    arxivService.recentArticles = jest.fn(() => Observable.of({ articles }));
};

beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../../shared/errorReporter', () => ({ reportNonFatal: jest.fn() }));
    jest.doMock('../../../selector', () => ({ getRecentArticlesNextPageIndex: jest.fn() }));
    actions$ = ActionsObservable.of(fetchRecentArticles());
    state$ = new BehaviorSubject();
});

it('fetches articles', () => {
    setIsConnected(true);
    const receivedArticles = [createArticle('01'), createArticle('02')];
    setReceivedArticles(receivedArticles);

    const results = [];
    const fetchRecentArticlesEpic = require('../fetchRecentArticles').default;
    fetchRecentArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results).toEqual([receiveRecentArticles(receivedArticles)]);
});

it('does not fetch articles when connection is offline', () => {
    setIsConnected(false);
    setReceivedArticles([createArticle('01'), createArticle('02')]);

    const results = [];
    const fetchRecentArticlesEpic = require('../fetchRecentArticles').default;
    fetchRecentArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results[0].type).toEqual(recentArticlesErrorNoNetwork().type);
});
