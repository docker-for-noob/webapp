import {IValidatorRepository, IValidatorService} from "../../ports/ValidatorsPorts";
import {validator} from "./type";
import {ValidatorRepository} from "../../../../infrastructure/repositories/ValidatorRepository";

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
    mustNotContainsSpecialCharactersExceptEquals,
} = ValidatorRepository;


const combineValidator = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const portsValidator = (actual): validator => value => ((
    required(value) &&
    mustBeNumber(value) &&
    mustBePositive(value) &&
    valueMustBeUnique(actual)(value)
) || (
    required(value) &&
    mustBeString(value) &&
    valueMustBeUnique(actual)(value) &&
    mustNotContainsWhiteSpace(value)
));

const envVariableNameValidator: validator = value => (
    mustBeInUpperCase(value) ||
    mustBeString(value)
);

const envVariableValueValidator: validator = value => (
    required(value)
);

const envVariablePathValidator: validator = value => (
    mustBePath(value)
);

const serviceNameValidator: validator = value => (
    required(value) &&
    mustBeString(value) &&
    mustNotContainsWhiteSpace(value)
    // Pas de caracteres spéciaux autres que _ -
    //validatorRepository.mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(value)
);

const containerNameValidator: validator = value => (
    mustBeString(value) &&
    mustNotContainsWhiteSpace(value)
    // Pas de caracteres spéciaux autres que _ -
);

const languageValidator: validator = value => (
    required(value) &&
    mustBeString(value) &&
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(value)

);

const imageTypeValidator: validator = value => (
    required(value) &&
    mustBeString(value) &&
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPoint(value)
);

const versionValidator: validator = value => (
    mustBeString(value)
);

const tagsValidator: validator = value => (
    mustBeString(value)
);

const volumesValidator: validator = value => (
    required(value) &&
    mustBeString(value) &&
    mustBePath(value)
);

export const validatorService: IValidatorService = {
    combineValidator,
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
}