// @flow
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import { persistReducer, persistStore } from './persistence';
import createEpicMiddlewareContainer from './epic';
import createNavigationMiddleware from './navigation';

import rootReducer from '../reducer';
import rootEpic from '../epic';

const devMiddleware = () => {
    if (__DEV__) {
        return [createLogger()];
    }
    return [];
};

export default () => {
    const epicMiddlewareContainer = createEpicMiddlewareContainer(rootEpic);
    const store = createStore(
        persistReducer(rootReducer),
        applyMiddleware(
            createNavigationMiddleware(),
            epicMiddlewareContainer.getMiddleware(),
            ...devMiddleware(),
        ),
    );
    epicMiddlewareContainer.emitInitialState(store);
    const persistor = persistStore(store);
    return { store, persistor };
};

