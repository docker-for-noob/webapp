import {
    mustBeNumber,
    mustBePositive,
    mustBeString, mustNotContainsSpecialCharactersExceptEquals,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint,
    mustNotContainsUppercase,
    mustNotContainsWhiteSpace,
    required,
    valueMustBeUnique
} from "../domain/utils/Validation/CustomValidator";
import {
    mustBeNumberError,
    mustBePositiveError,
    mustBeStringError,
    mustNotContainsSpecialCharactersExceptEqualsError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsUppercaseError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError
} from "../domain/utils/Validation/Strings";

test("A value is required and should return an error message", () => {
    const initial = undefined;
    expect(required(initial)).toStrictEqual(requiredError);
});

test("required func take an empty object and return undefined", () => {
    const initial = {};
    const expected = undefined
    expect(required(initial)).toStrictEqual(expected);
});

test("required func take an int and return undefined", () => {
    const initial = 5;
    const expected = undefined
    expect(required(initial)).toStrictEqual(expected);
});

test("required func take a string and return undefined", () => {
    const initial = "string";
    const expected = undefined
    expect(required(initial)).toStrictEqual(expected);
});

test("mustBeNumber func take a string and return an error message", () => {
    const initial = "string";
    expect(mustBeNumber(initial)).toStrictEqual(mustBeNumberError);
});

test("mustBeNumber func take a number and return undefined", () => {
    const initial = 5;
    const expected = undefined
    expect(mustBeNumber(initial)).toStrictEqual(expected);
});

test("mustBePositive func take a positive integer and return undefined", () => {
    const initial = 5;
    const expected = undefined
    expect(mustBePositive(initial)).toStrictEqual(expected);
});

test("mustBePositive func take a negative integer and return an error message", () => {
    const initial = -5;
    expect(mustBePositive(initial)).toStrictEqual(mustBePositiveError);
});

test ("mustBeString func take a string and return undefined", () => {
    const initial = "string";
    const expected = undefined
    expect(mustBeString(initial)).toStrictEqual(expected);
});

test ("mustBeString func take a number and return an error message", () => {
    const initial = 5;
    expect(mustBeString(initial)).toStrictEqual(mustBeStringError);
});

test ("mustNotContainsWhiteSpace func take a string without space and undefined", () => {
    const initial = "stringwithoutspace";
    const expected = undefined
    expect(mustNotContainsWhiteSpace(initial)).toStrictEqual(expected);
});

test ("mustNotContainsWhiteSpace func take a string with space and return an error message", () => {
    const initial = "string with space";
    expect(mustNotContainsWhiteSpace(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
});

test ("mustNotContainsUppercase func take a string without Uppercase and return undefined", () => {
    const initial = "stringwithoutspace";
    const expected = undefined
    expect(mustNotContainsUppercase(initial)).toStrictEqual(expected);
});

test ("mustNotContainsUppercase func take a string without Uppercase and return undefined", () => {
    const initial = "stringWithSpace";
    expect(mustNotContainsUppercase(initial)).toStrictEqual(mustNotContainsUppercaseError);
});

test ("valueMustBeUnique func take two different value and return undefined", () => {
    const initial = "8079";
    const allValues =  ["8080", "8081", "8082"];
    const expected = undefined
    expect(valueMustBeUnique(allValues)(initial)).toStrictEqual(expected);
});

test ("valueMustBeUnique func take two different value an return an error message", () => {
    const initial = "8080";
    const allValues = ["8080", "8081", "8082"];
    expect(valueMustBeUnique(allValues)(initial)).toStrictEqual(valueMustBeUniqueError);
});

test ("mustNotContainsSpecialCharactersExceptUnderscore func string without special characters and return undefined", () => {
    const initial = "stringWithoutSpecialCharacters";
    const expected = undefined
    expect(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(initial)).toStrictEqual(expected);
});

test ("mustNotContainsSpecialCharactersExceptUnderscore func string without special characters but with -_/ and return undefined", () => {
    const initial = "stringWithoutSpecialCharactersbutWithUnderscore-_/.";
    const expected = undefined
    expect(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(initial)).toStrictEqual(expected);
});

test ("mustNotContainsSpecialCharactersExceptUnderscore func take a string with a special character and return an error message", () => {
    const initial = "stringWithoutSpeci@lCharactersbutWithUnderscore-_";
    expect(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError);
});

test ("mustNotContainsSpecialCharactersExceptUnderscore func take a string with a special character and return an error message", () => {
    const initial = "stringWithoutSpecialCharactersWith=";
    const expected = undefined;
    expect(mustNotContainsSpecialCharactersExceptEquals(initial)).toStrictEqual(expected);
});

test ("mustNotContainsSpecialCharactersExceptUnderscore func take a string with a special character and return an error message", () => {
    const initial = "stringWithSpecialCh@r@ctersWith=";
    const expected = undefined;
    expect(mustNotContainsSpecialCharactersExceptEquals(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptEqualsError);
});