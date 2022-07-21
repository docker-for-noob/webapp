import {DomainException, InfrastructureException} from "../../../utils/exception/type";
import {Error} from "../../../utils/maybe/Maybe";

export type Validator = (value: any) => ValidatorResult
export type ValidatorResult = Error<InfrastructureException | DomainException> | undefined;
export type Ports = string[]
