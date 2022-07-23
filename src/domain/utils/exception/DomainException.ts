import { DomainException } from "./type";
import { error, Error } from "../maybe/Maybe";

const requiredError: Error<DomainException> = error("This field is required");
const mustBeNumberError: Error<DomainException> = error("Must be a number");
const mustBePositiveError: Error<DomainException> = error(
  "Must be a positive number"
);
const mustBeStringError: Error<DomainException> = error("Must be a string");
const mustNotContainsWhiteSpaceError: Error<DomainException> = error(
  "Must not contain white space"
);
const mustNotContainsUppercaseError: Error<DomainException> = error(
  "Must not contain uppercase"
);
const mustBePathError: Error<DomainException> = error("Must be a path");
const mustBeInUpperCaseError: Error<DomainException> = error(
  "Must be in uppercase"
);
const valueMustBeUniqueError: Error<DomainException> = error(
  "Value must be unique"
);
const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError: Error<DomainException> =
  error(
    "Must not contain special characters except underscore slash and point"
  );
const mustNotContainsSpecialCharactersExceptUnderscoreError: Error<DomainException> =
  error("Must not contain special characters except underscore");
const mustNotContainsSpecialCharactersExceptEqualsError: Error<DomainException> =
  error("Must not contain special characters except equal");
const noContainerFoundError: Error<DomainException> = error(
    "No container found"
);

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
  noContainerFoundError,
};
