import {IValidatorService} from "../../ports/ValidatorsPorts";
import {
    required,
    mustBeString,
} from "../../../../../infrastructure/validators/ValidatorDependance";
import {combineValidator} from "../../../../application/validators/CombineValidators";


const portMustBeUnique = (value) => combineValidator(required, mustBeString)(value);

export const ValidatorService: IValidatorService = {
    portMustBeUnique
};
