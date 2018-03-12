import { persistReducer as persistReducerRP, persistStore as persistStoreRP } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const whitelistDownloadedPapers = createWhitelistFilter(
    'papers',
    ['received'],
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [whitelistDownloadedPapers],
    stateReconciler: hardSet,
    whitelist: ['papers', 'donations'],
};

export const persistReducer = rootReducer => persistReducerRP(persistConfig, rootReducer);
export const persistStore = store => persistStoreRP(store);
