import {DomainException} from "./type";

const requiredError: DomainException = 'This field is required';
const mustBeNumberError: DomainException = 'Must be a number';
const mustBePositiveError: DomainException = 'Must be a positive number';
const mustBeStringError: DomainException = 'Must be a string';
const mustNotContainsWhiteSpaceError: DomainException = 'Must not contain white space';
const mustNotContainsUppercaseError: DomainException = 'Must not contain uppercase';
const mustBePathError: DomainException = 'Must be a path';
const mustBeInUpperCaseError: DomainException = 'Must be in uppercase';
const valueMustBeUniqueError: DomainException = 'Value must be unique';
const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError: DomainException = 'Must not contain special characters except underscore slash and point';
const mustNotContainsSpecialCharactersExceptUnderscoreError: DomainException = 'Must not contain special characters except underscore';
const mustNotContainsSpecialCharactersExceptEqualsError: DomainException = 'Must not contain special characters except equal';


export {
    requiredError,
    mustBeNumberError,
    mustBePositiveError,
    mustBeStringError,
    mustBePathError,
    mustNotContainsWhiteSpaceError,
    mustNotContainsUppercaseError,
    valueMustBeUniqueError,
    mustBeInUpperCaseError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsSpecialCharactersExceptUnderscoreError,
    mustNotContainsSpecialCharactersExceptEqualsError,
}