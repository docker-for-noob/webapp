export const combineValidator = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);