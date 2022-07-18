import {
    configureStore,
} from '@reduxjs/toolkit';
import {reduxBatch} from '@manaflair/redux-batch';
import {persistStore} from 'redux-persist'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {setupListeners} from '@reduxjs/toolkit/query'
import requestReducer from '../request/slicer'
import {apiSlice }   from '../../api/apiSlice'
import imageReferenceReducer    from '../../imageReference/store/imageReference/slicer'


export const store = configureStore({
    reducer: {
        imageReferenceReducer: imageReferenceReducer,
        requestReducer: requestReducer,
        [apiSlice.reducerPath]:  apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
    enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers, reduxBatch],
});

setupListeners(store.dispatch)


export const persistor = persistStore(store);
