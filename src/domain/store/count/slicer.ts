import {createSlice} from '@reduxjs/toolkit';

const initialState: number = 0


const CountSlice = createSlice({
    name: 'countStore',
    initialState: initialState,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
    },
});

export const {
increment,
decrement,

} = CountSlice.actions;

export default CountSlice.reducer;

