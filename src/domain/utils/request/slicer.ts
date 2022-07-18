import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type RequestState = {
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

const initialState: RequestState = {
    isLoading: false,
    isError: false,
    error: null,
};


const RequestSlice = createSlice({
    name: 'RequestStore',
    initialState: initialState,
    reducers: {
        requestStart: (state) => {
            return {...state,isLoading : true, isError: false, error: null}
        },
        requestCompleted: (state) => {
            return {...state,isLoading : false, isError: false, error: null}
        },
        requestError: (state, action: PayloadAction<string>) => {
            return {...state,isLoading : false, isError: true, error: action.payload}
        }
    },
});

export const {
    requestStart,
    requestCompleted,
    requestError
} = RequestSlice.actions;

export default RequestSlice.reducer;