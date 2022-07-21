import { Ports, Validator } from "../service/validator/type";

export interface IValidatorService {
  portsValidator: (actual: Ports) => Validator;
  envVariableNameValidator: Validator;
  envVariableValueValidator: Validator;
  envVariablePathValidator: Validator;
  serviceNameValidator: Validator;
  containerNameValidator: Validator;
  languageValidator: Validator;
  imageTypeValidator: Validator;
  versionValidator: Validator;
  tagsValidator: Validator;
  volumesValidator: Validator;
}

export interface IValidatorRepository {
  required: Validator;
  mustBeNumber: Validator;
  mustBePositive: Validator;
  mustBeString: Validator;
  mustBePath: Validator;
  mustNotContainsWhiteSpace: Validator;
  mustNotContainsUppercase: Validator;
  mustBeInUpperCase: Validator;
  valueMustBeUnique: (allValues: any[]) => Validator;
  mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: Validator;
  mustNotContainsSpecialCharactersExceptUnderscore: Validator;
  mustNotContainsSpecialCharactersExceptEquals: Validator;
}
