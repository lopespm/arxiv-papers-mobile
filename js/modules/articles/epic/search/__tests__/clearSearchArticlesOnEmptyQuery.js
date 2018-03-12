import 'rxjs';
import { ActionsObservable } from 'redux-observable';

import { searchArticles, clearSearchArticles } from '../../../actions';
import clearSearchArticlesEpic from '../clearSearchArticlesOnEmptyQuery';

it('clears search articles when searching with an empty query', () => {
    const actions$ = ActionsObservable.of(searchArticles(''));
    const results = [];
    clearSearchArticlesEpic(actions$).subscribe(x => results.push(x));

    expect(results).toEqual([clearSearchArticles()]);
});

it('does not clear search articles when query is not empty', () => {
    const actions$ = ActionsObservable.of(searchArticles('search term'));
    const results = [];
    clearSearchArticlesEpic(actions$).subscribe(x => results.push(x));

    expect(results).toEqual([]);
});
