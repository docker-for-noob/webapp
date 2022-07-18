import {
    mustBeNumberError,
    mustBePositiveError,
    mustBeStringError, mustNotContainsSpecialCharactersExceptEqualsError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsUppercaseError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError
} from "./Strings";


export type validator = (value: any) => string | undefined;

const required: validator = value => value ? undefined : requiredError;
const mustBeNumber: validator = value => isNaN(value) ? mustBeNumberError : undefined;
const mustBePositive: validator = value => value < 0 ? mustBePositiveError : undefined;
const mustBeString: validator = value => typeof value !== 'string' ? mustBeStringError : undefined;
const mustNotContainsWhiteSpace: validator = value => value.indexOf(' ') >= 0 ? mustNotContainsWhiteSpaceError : undefined;

const mustNotContainsUppercase: validator = value => {
    const upperCaseRegex = /[A-Z]/;
    return upperCaseRegex.test(value) ? mustNotContainsUppercaseError : undefined;
}

const valueMustBeUnique = (allValues: any[]): validator => (value) => {
    const currentIndex = allValues.indexOf(value);
    return currentIndex === -1 ? undefined : valueMustBeUniqueError;
}

const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: validator = value => {
    const specialCharactersRegex = /[^a-zA-Z0-9./_-]/;
    return specialCharactersRegex.test(value) ? mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError : undefined;
}

const mustNotContainsSpecialCharactersExceptEquals: validator = value => {
    const specialCharactersRegex = /[^a-zA-Z0-9=]/;
    return specialCharactersRegex.test(value) ? mustNotContainsSpecialCharactersExceptEqualsError : undefined;
}

export {
    required,
    mustBeNumber,
    mustBePositive,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsUppercase,
    valueMustBeUnique,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint,
    mustNotContainsSpecialCharactersExceptEquals
}