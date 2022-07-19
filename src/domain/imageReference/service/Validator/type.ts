export type validator = (value: any) =>validatorResult
export type validators = validator[];
export type validatorResult = string | undefined;

