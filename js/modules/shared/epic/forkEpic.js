import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';

export default (epicFactory, store, dependencies, ...actions) => {
    const input$ = Observable.of(...actions);
    const actions$ = new ActionsObservable(input$);
    return epicFactory(actions$, store, dependencies);
};
