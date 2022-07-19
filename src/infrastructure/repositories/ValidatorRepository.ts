import {IValidatorRepository} from "../../domain/imageReference/ports/ValidatorsPorts";
import {
    mustBeAPathError,
    mustBeInUpperCaseError,
    mustBeNumberError,
    mustBePositiveError,
    mustBeStringError,
    mustNotContainsSpecialCharactersExceptEqualsError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsUppercaseError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError
} from "../../domain/imageReference/constants/Strings";
import {validator} from "../../domain/imageReference/service/Validator/type";

const required: validator = value => value ? undefined : requiredError;
const mustBeNumber: validator = value => isNaN(value) ? mustBeNumberError : undefined;
const mustBePositive: validator = value => value < 0 ? mustBePositiveError : undefined;
const mustBeString: validator = value => typeof value !== 'string' ? mustBeStringError : undefined;
const mustNotContainsWhiteSpace: validator = value => value.indexOf(' ') >= 0 ? mustNotContainsWhiteSpaceError : undefined;
const mustBeInUpperCase: validator = value => value.toUpperCase() !== value ? mustBeInUpperCaseError : undefined;

const mustNotContainsUppercase: validator = value => {
    const upperCaseRegex = /[A-Z]/;
    return upperCaseRegex.test(value) ? mustNotContainsUppercaseError : undefined;
}
const mustBePath: validator = value => {
    const pathRegex = /^(\/[^/]+)+\/?$/;
    return pathRegex.test(value) ? undefined : mustBeAPathError;
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

export const ValidatorRepository: IValidatorRepository = {
    required,
    mustBeNumber,
    mustBePositive,
    mustBeString,
    mustBeInUpperCase,
    mustNotContainsWhiteSpace,
    mustNotContainsUppercase,
    valueMustBeUnique,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint,
    mustNotContainsSpecialCharactersExceptEquals,
    mustBePath,
}

// test code:
// Must be a path
// Must be in uppercase