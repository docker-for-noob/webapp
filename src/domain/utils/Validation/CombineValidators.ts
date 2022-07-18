import {mustBeString, required, validator, valueMustBeUnique} from "./CustomValidator";


const combineValidator = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

const portValidator = (actual): validator => value => (
    required(value) ||
    mustBeString(value) ||
    valueMustBeUnique(actual)(value)
)

const envValidator : validator =  value => (
    required(value) ||
    mustBeString(value)
)



export {
    combineValidator,
    portValidator,
    envValidator
}