import {IValidatorRepository} from "../../domain/imageReference/ports/ValidatorsPorts";
import {
    mustBePathError,
    mustBeInUpperCaseError,
    mustBeNumberError,
    mustBePositiveError,
    mustBeStringError,
    mustNotContainsSpecialCharactersExceptEqualsError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsUppercaseError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError,
    mustNotContainsSpecialCharactersExceptUnderscoreError
} from "../../domain/imageReference/constants/Strings";
import {Validator} from "../../domain/imageReference/service/Validator/type";

const required: Validator = value => value ? undefined : requiredError;
const mustBeNumber: Validator = value => isNaN(value) ? mustBeNumberError : undefined;
const mustBePositive: Validator = value => value < 0 ? mustBePositiveError : undefined;
const mustBeString: Validator = value => typeof value !== 'string' ? mustBeStringError : undefined;
const mustNotContainsWhiteSpace: Validator = value => value.indexOf(' ') >= 0 ? mustNotContainsWhiteSpaceError : undefined;
const mustBeInUpperCase: Validator = value => value.toUpperCase() !== value ? mustBeInUpperCaseError : undefined;

const mustNotContainsUppercase: Validator = value => {
    const upperCaseRegex = /[A-Z]/;
    return upperCaseRegex.test(value) ? mustNotContainsUppercaseError : undefined;
}

const mustBePath: Validator = value => {
    const pathRegex = /^(?:[a-z]:)?([\/\\]{0,2})(?:[.\/\\ ](?![.\/\\\n])|[^<>:"|?*.\/\\ \n])+$/i;
    return pathRegex.test(value) ? undefined : mustBePathError;
}

const valueMustBeUnique = (allValues: any[]): Validator => (value) => {
    const currentIndex = allValues.indexOf(value);
    return currentIndex === -1 ? undefined : valueMustBeUniqueError;
}

const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: Validator = value => {
    const specialCharactersRegex = /[^a-zA-Z0-9./_-]/;
    return specialCharactersRegex.test(value) ? mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError : undefined;
}

const mustNotContainsSpecialCharactersExceptUnderscore: Validator = value => {
    const specialCharactersRegex = /[^a-zA-Z0-9_-]/;
    return specialCharactersRegex.test(value) ? mustNotContainsSpecialCharactersExceptUnderscoreError : undefined;
}

const mustNotContainsSpecialCharactersExceptEquals: Validator = value => {
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
    mustNotContainsSpecialCharactersExceptUnderscore,
    mustNotContainsSpecialCharactersExceptEquals,
    mustBePath,
}
