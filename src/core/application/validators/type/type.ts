import {
  DomainException,
  InfrastructureException,
} from "../../commons/exception/exception";
import { Error, Suggest, Warning } from "../../commons/maybe/Maybe";

export type Validator = (value: any) => ValidatorResult;
export type ValidatorResult =
  | Error<InfrastructureException | DomainException>
  | Warning<InfrastructureException | DomainException>
  | Suggest<InfrastructureException | DomainException>
  | undefined;
export type Ports = string[];
