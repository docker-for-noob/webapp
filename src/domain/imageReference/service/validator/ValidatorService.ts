import { IValidatorService } from "../../ports/ValidatorsPorts";
import { Validator } from "./type";
import { ValidatorRepository } from "../../../../infrastructure/repositories/ValidatorRepository";
import { combineValidator } from "./ValidatorsHelper";

const {
  required,
  mustBeNumber,
  mustBePositive,
  mustBeString,
  mustBeInUpperCase,
  mustBePath,
  mustNotContainsWhiteSpace,
  mustNotContainsUppercase,
  valueMustBeUnique,
  mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint,
  mustNotContainsSpecialCharactersExceptUnderscore,
  mustNotContainsSpecialCharactersExceptEquals,
} = ValidatorRepository;

const envVariableNameValidator: Validator = (value) =>
  combineValidator(mustBeInUpperCase, mustBeString)(value);
const envVariableValueValidator: Validator = (value) =>
  combineValidator(required)(value);
const envVariablePathValidator: Validator = (value) =>
  combineValidator(mustBePath)(value);
const versionValidator: Validator = (value) =>
  combineValidator(mustBeString, mustNotContainsWhiteSpace)(value);
const tagsValidator: Validator = (value) =>
  combineValidator(mustBeString, mustNotContainsWhiteSpace)(value);
const volumesValidator: Validator = (value) =>
  combineValidator(required, mustBePath)(value);

const serviceNameValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscore
  )(value);

const containerNameValidator: Validator = (value) =>
  combineValidator(
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscore
  )(value);

const languageValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint
  )(value);

const imageTypeValidator: Validator = (value) =>
  combineValidator(
    required,
    mustBeString,
    mustNotContainsWhiteSpace,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint
  )(value);

const portsValidator =
  (actual): Validator =>
  (value) =>
    combineValidator(required, valueMustBeUnique(actual), mustBeString)(value);

export const validatorService: IValidatorService = {
  portsValidator,
  envVariableNameValidator,
  envVariableValueValidator,
  envVariablePathValidator,
  serviceNameValidator,
  containerNameValidator,
  languageValidator,
  imageTypeValidator,
  versionValidator,
  tagsValidator,
  volumesValidator,
};
