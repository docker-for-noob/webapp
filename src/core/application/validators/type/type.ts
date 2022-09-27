import {
  DomainException,
  InfrastructureException,
} from "../../commons/exception/exception";
import { Error } from "../../commons/maybe/Maybe";

export type Validator = (value: any) => ValidatorResult;
export type ValidatorResult =
  | Error<InfrastructureException | DomainException>
  | undefined;
export type Ports = string[];
