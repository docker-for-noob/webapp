import {DomainException} from "../../../utils/exception/type";

export type Validator = (value: any) =>ValidatorResult
export type ValidatorResult = DomainException | undefined;
export type Ports = string[]
