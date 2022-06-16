import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction} from '@reduxjs/toolkit';
import { store } from '@domain/store/store';
import {RootState} from "@domain/store/type";


export type AppDispatch = typeof store.dispatch &
    ((actions: AnyAction[]) => AnyAction[]);

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
