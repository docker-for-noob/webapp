import {validator, validators} from "../service/Validator/type";

export interface IValidatorService {
    combineValidator(...validators: validators): validator;
    portsValidator: (actual: string | number) => validator
    envVariableNameValidator: validator
    envVariableValueValidator: validator
    envVariablePathValidator: validator
    serviceNameValidator: validator
    containerNameValidator: validator
    languageValidator: validator
    imageTypeValidator: validator
    versionValidator: validator
    tagsValidator: validator
    volumesValidator: validator
}

export interface IValidatorRepository {
    required: validator
    mustBeNumber: validator
    mustBePositive: validator
    mustBeString: validator
    mustBePath: validator
    mustNotContainsWhiteSpace: validator
    mustNotContainsUppercase: validator
    mustBeInUpperCase: validator
    valueMustBeUnique: (allValues: any[]) => validator
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint: validator
    mustNotContainsSpecialCharactersExceptEquals: validator
}