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
} from "../../domain/utils/exception/DomainException";
import {Validator} from "../../domain/imageReference/service/validator/type";
import {
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_EQUALS,
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE,
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE_SLASH_AND_POINT,
    REGEXP_PATH,
    REGEXP_UPPERCASE
} from "../../domain/imageReference/constants/RegExp";

const required: Validator = value => value ? undefined : requiredError;
const mustBeNumber: Validator = value => isNaN(value) ? mustBeNumberError : undefined;
const mustBePositive: Validator = value => value < 0 ? mustBePositiveError : undefined;
const mustBeString: Validator = value => typeof value !== 'string' ? mustBeStringError : undefined;
const mustNotContainsWhiteSpace: Validator = value => value.indexOf(' ') >= 0 ? mustNotContainsWhiteSpaceError : undefined;
const mustBeInUpperCase: Validator = value => value.toUpperCase() !== value ? mustBeInUpperCaseError : undefined;

const mustNotContainsUppercase: Validator = value => {
    return REGEXP_UPPERCASE.test(value) ? mustNotContainsUppercaseError : undefined;
}

const mustBePath: Validator = value => {
    return REGEXP_PATH.test(value) ? undefined : mustBePathError;
}

const valueMustBeUnique = (allValues: any[]): Validator => (value) => {
    const currentIndex = allValues.indexOf(value);
    return currentIndex === -1 ? undefined : valueMustBeUniqueError;
}

const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: Validator = value => {
    return REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE_SLASH_AND_POINT.test(value) ?
        mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError :
        undefined;
}

const mustNotContainsSpecialCharactersExceptUnderscore: Validator = value => {
    return REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE.test(value)
        ? mustNotContainsSpecialCharactersExceptUnderscoreError :
        undefined;
}

const mustNotContainsSpecialCharactersExceptEquals: Validator = value => {
    return REGEXP_SPECIAL_CHARACTERS_EXCEPT_EQUALS.test(value) ?
        mustNotContainsSpecialCharactersExceptEqualsError :
        undefined;
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
