import {portUIValidator} from "../../../infrastructure/validators/InputValidator";
import {ValidatorService} from "../../domain/dockerCompose/service/validator/ValidatorService";
import {combineValidator} from "./CombineValidators";
import {HostContainer, port} from "../../domain/dockerCompose/models/DockerImage";
import {Validator} from "./type/type";


const {
    ServiceNameNeedAnAlias,
} = ValidatorService


export const ServiceNameValidator = (allServiceName?: string[]) => (value: string) =>
    combineValidator(
        portUIValidator,
        ServiceNameNeedAnAlias(allServiceName))(value);