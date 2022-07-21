import reducer, {
  requestStart,
  requestError,
  requestCompleted,
  RequestState,
} from "../domain/utils/request/slicer";

const initialState: RequestState = {
  isLoading: false,
  isError: false,
  error: null,
};

test("start request and set loading state to true", () => {
  const initial = { ...initialState };
  const expected = {
    ...initialState,
    isLoading: true,
    isError: false,
    error: null,
  };
  expect(reducer(initial, requestStart())).toStrictEqual(expected);
});

test("after the start of the request we encounter an error", () => {
  const initial = {
    ...initialState,
    isLoading: true,
    isError: false,
    error: null,
  };
  const error = "error";
  const expected = {
    ...initialState,
    isLoading: false,
    isError: true,
    error: error,
  };
  expect(reducer(initial, requestError(error))).toStrictEqual(expected);
});

test("after the start of the request we encounter success", () => {
  const initial = {
    ...initialState,
    isLoading: true,
    isError: false,
    error: null,
  };
  const expected = {
    ...initialState,
    isLoading: false,
    isError: false,
    error: null,
  };
  expect(reducer(initial, requestCompleted())).toStrictEqual(expected);
});
