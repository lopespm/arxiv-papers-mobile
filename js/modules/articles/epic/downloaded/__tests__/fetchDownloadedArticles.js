import 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { downloadedArticlesErrorNoNetwork, fetchDownloadedArticles, receiveDownloadedArticles } from '../../../actions';
import { create as createDomainArticle } from '../../../article';

let actions$;
let state$;
const arxivService = jest.fn();

const createArticle = id => createDomainArticle({ id });

const setIsConnected = (isConnected) => {
    jest.doMock('../../../../../selector', () => ({
        getIsConnected: jest.fn(() => isConnected),
        getCurrentPageOfDownloadedPapersArticlesIds: jest.fn(),
    }));
};

const setReceivedArticles = (articles) => {
    arxivService.fetchByIds = jest.fn(() => Observable.of({ articles }));
};

beforeEach(() => {
    jest.resetModules();
    jest.mock('../../../../shared/errorReporter', () => ({ reportNonFatal: jest.fn() }));
    actions$ = ActionsObservable.of(fetchDownloadedArticles());
    state$ = new BehaviorSubject();
});

it('fetches articles', () => {
    setIsConnected(true);
    const receivedArticles = [createArticle('01'), createArticle('02')];
    setReceivedArticles(receivedArticles);

    const results = [];
    const fetchDownloadedArticlesEpic = require('../fetchDownloadedArticles').default;
    fetchDownloadedArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results).toEqual([receiveDownloadedArticles(receivedArticles)]);
});

it('does not fetch articles when connection is offline', () => {
    setIsConnected(false);
    setReceivedArticles([createArticle('01'), createArticle('02')]);

    const results = [];
    const fetchDownloadedArticlesEpic = require('../fetchDownloadedArticles').default;
    fetchDownloadedArticlesEpic(actions$, null, { state$, arxivService }).subscribe(x => results.push(x));
    expect(results[0].type).toEqual(downloadedArticlesErrorNoNetwork().type);
});
