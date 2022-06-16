import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/es/storage';

export const persistConfig = (key:string) =>({
  key: key,
  version: 1,
  storage,
});

export const persist = (persistConfig :any, reducer : any) =>
  persistReducer<typeof reducer>({...persistConfig, storage}, reducer);

