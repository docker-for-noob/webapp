import {
    Error,
    error,
    getError,
    getResult,
    isError,
    isSuccess,
    Maybe,
    Success,
    success
} from "../core/application/commons/maybe/Maybe";

const isInLowerCase = (expr: string): Maybe<boolean> => {
    if (expr.toLowerCase() !== expr) {
        return error("Must be in lower case");
    }
    return success(true);
}

const MockedSuccess: Success<boolean> = {
    type: "SUCCESS",
    result: true
}

const MockedError: Error<boolean> = {
    type: "ERROR",
    error: "Must be in lower case"
}

test("Input Success, isError return false", function () {
    expect(isError(MockedSuccess)).toEqual(false);
});

test("Input Success, isSuccess return true", function () {
    expect(isSuccess(MockedSuccess)).toEqual(true);
});

test("Input Error, isError return true", function () {
    expect(isError(MockedError)).toEqual(true);
});

test("Input Error, isSuccess return false", function () {
    expect(isSuccess(MockedError)).toEqual(false);
});

test("Input Success, get result return value", function () {
    expect(getResult(MockedSuccess)).toEqual(true);
});

test("Input Success, get error return undefined", function () {
    expect(getError(MockedSuccess)).toEqual(undefined);
});

test("Input error, get error return error", function () {
    expect(getError(MockedError)).toEqual("Must be in lower case");
});
test("Input error,  get resulte return undefined", function () {
    expect(getResult(MockedError)).toEqual(undefined);
});

test("Input OK, Output OK", function () {
    const actual = isInLowerCase("test")
    expect(actual.type).toEqual("SUCCESS");
    expect(getResult(actual)).toEqual(true);
});

test("Input OK, Output KO", function () {
    const actual = isInLowerCase("TEST")
    expect(actual.type).toEqual("ERROR");
    expect(getError(actual)).toEqual("Must be in lower case");
});
