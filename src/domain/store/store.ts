import {
    configureStore,
} from '@reduxjs/toolkit';
import {reduxBatch} from '@manaflair/redux-batch';
import articleReducer from './article/slicer';
import countReducer from './count/slicer';
import { persistStore, persistReducer } from 'redux-persist'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {persist, persistConfig} from "./persist";

export const store = configureStore({
    reducer: {
        articleReducer:persist(persistConfig('article'),articleReducer) ,
        countReducer: countReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers, reduxBatch],
});



export const persistor = persistStore(store);
