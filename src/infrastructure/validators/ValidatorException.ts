import { InfrastructureException } from "../../core/application/commons/exception/exception";
import { error, Error } from "../../core/application/commons/maybe/Maybe";

const requiredError: Error<InfrastructureException> = error(
  "This field is required"
);
const mustBeNumberError: Error<InfrastructureException> =
  error("Must be a number");
const mustBePositiveError: Error<InfrastructureException> = error(
  "Must be a positive number"
);
const mustBeStringError: Error<InfrastructureException> =
  error("Must be a string");
const mustNotContainsWhiteSpaceError: Error<InfrastructureException> = error(
  "Must not contain white space"
);
const mustNotContainsUppercaseError: Error<InfrastructureException> = error(
  "Must not contain uppercase"
);
const mustBePathError: Error<InfrastructureException> = error("Must be a path");
const mustBeInUpperCaseError: Error<InfrastructureException> = error(
  "Must be in uppercase"
);
const valueMustBeUniqueError: Error<InfrastructureException> = error(
  "Value must be unique"
);
const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError: Error<InfrastructureException> =
  error(
    "Must not contain special characters except underscore slash and point"
  );
const mustNotContainsSpecialCharactersExceptUnderscoreError: Error<InfrastructureException> =
  error("Must not contain special characters except underscore");
const mustNotContainsSpecialCharactersExceptEqualsError: Error<InfrastructureException> =
  error("Must not contain special characters except equal");

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
};
