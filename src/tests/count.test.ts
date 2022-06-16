import reducer, {decrement, increment} from '../domain/store/count/slicer';

test("increment a value in reducer", () => {
    const initialState =  0
    const expected = 1
    expect(reducer(initialState,increment())).toBe(expected);
});


test("decrement a value in reducer", () => {
    const initialState = 1
    const expected = 0
    expect(reducer(initialState,decrement())).toBe(expected);
});
