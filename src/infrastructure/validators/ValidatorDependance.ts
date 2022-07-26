import {Validator} from "../../core/application/validators/type/type";
import {
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_EQUALS,
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE,
    REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE_SLASH_AND_POINT,
    REGEXP_PATH,
    REGEXP_UPPERCASE,
} from "./RegExp";
import {
    mustBeInUpperCaseError,
    mustBeNumberError,
    mustBePathError,
    mustBePositiveError,
    mustBeStringError,
    mustNotContainsSpecialCharactersExceptEqualsError,
    mustNotContainsSpecialCharactersExceptUnderscoreError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsUppercaseError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError
} from "./ValidatorException";

const required: Validator = (value) => (value ? undefined : requiredError);
const mustBeNumber: Validator = (value) =>
    isNaN(value) ? mustBeNumberError : undefined;
const mustBePositive: Validator = (value) =>
    value < 0 ? mustBePositiveError : undefined;
const mustBeString: Validator = (value) =>
    typeof value !== "string" ? mustBeStringError : undefined;
const mustNotContainsWhiteSpace: Validator = (value) =>
    value.indexOf(" ") >= 0 ? mustNotContainsWhiteSpaceError : undefined;
const mustBeInUpperCase: Validator = (value) =>
    value.toUpperCase() !== value ? mustBeInUpperCaseError : undefined;

const mustNotContainsUppercase: Validator = (value) => {
    return REGEXP_UPPERCASE.test(value)
        ? mustNotContainsUppercaseError
        : undefined;
};

const mustBePath: Validator = (value) => {
    return REGEXP_PATH.test(value) ? undefined : mustBePathError;
};

const valueMustBeUnique =
    (allValues: any[]): Validator =>
        (value) => {
            const currentIndex = allValues.indexOf(value);
            return currentIndex === -1 ? undefined : valueMustBeUniqueError;
        };

const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: Validator =
    (value) => {
        return REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE_SLASH_AND_POINT.test(
            value
        )
            ? mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError
            : undefined;
    };

const mustNotContainsSpecialCharactersExceptUnderscore: Validator = (value) => {
    return REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE.test(value)
        ? mustNotContainsSpecialCharactersExceptUnderscoreError
        : undefined;
};

const mustNotContainsSpecialCharactersExceptEquals: Validator = (value) => {
    return REGEXP_SPECIAL_CHARACTERS_EXCEPT_EQUALS.test(value)
        ? mustNotContainsSpecialCharactersExceptEqualsError
        : undefined;
};

export {
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
};
