import { Validator } from "../../core/application/validators/type/type";
import {
  mustBeInUpperCase,
  mustBePath,
  mustBeString,
  mustNotContainsSpecialCharactersExceptUnderscore,
  mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint,
  mustNotContainsWhiteSpace,
  required,
} from "./ValidatorDependency";
import { combineValidator } from "../../core/application/validators/CombineValidators";

const envVariableNameUIValidator: Validator = (value) =>
  combineValidator(mustBeInUpperCase, mustBeString)(value);
const envVariableValueUIValidator: Validator = (value) =>
  combineValidator(mustBeString, required)(value);
const versionUIValidator: Validator = (value) =>
  combineValidator(mustBeString, mustNotContainsWhiteSpace)(value);
const tagsUIValidator: Validator = (value) =>
  combineValidator(mustBeString, mustNotContainsWhiteSpace)(value);
const volumesUIValidator: Validator = (value) =>
  combineValidator(mustBePath)(value);

const serviceNameUIValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscore
  )(value);

const containerNameUIValidator: Validator = (value) =>
  combineValidator(
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscore
  )(value);

const languageUIValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint
  )(value);

const imageTypeUIValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint
  )(value);

const portUIValidator = (value) =>
  combineValidator(required, mustBeString)(value);

export {
  portUIValidator,
  envVariableNameUIValidator,
  envVariableValueUIValidator,
  serviceNameUIValidator,
  containerNameUIValidator,
  languageUIValidator,
  imageTypeUIValidator,
  versionUIValidator,
  tagsUIValidator,
  volumesUIValidator,
};
