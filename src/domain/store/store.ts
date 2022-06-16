import {
    configureStore,
} from '@reduxjs/toolkit';
import {reduxBatch} from '@manaflair/redux-batch';
import articleReducer from './article/slicer';
import countReducer from './count/slicer';
import {persistStore} from 'redux-persist'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {persist, persistConfig} from "./persist";
import {ApiSlice} from "./api/apiSlice";
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        articleReducer: persist(persistConfig('article'), articleReducer),
        countReducer: countReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(ApiSlice.middleware),
    enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers, reduxBatch],
});

setupListeners(store.dispatch)


export const persistor = persistStore(store);
