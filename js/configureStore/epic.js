import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import arxivService from '../modules/articles/remote/arxivService';

export default (rootEpic) => {
    const state$ = new BehaviorSubject();
    const getMiddleware = () => createEpicMiddleware(rootEpic, {
        dependencies: {
            state$,
            arxivService,
        },
    });
    const emitInitialState = (store) => {
        state$.next(store.getState());
        store.subscribe(() => {
            state$.next(store.getState());
        });
    };
    return { getMiddleware, emitInitialState };
};
