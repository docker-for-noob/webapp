import {
    envVariableNameUIValidator, envVariableValueUIValidator,
    portUIValidator, volumesUIValidator
} from "../../../infrastructure/validators/InputValidator";
import {ValidatorService} from "../../domain/dockerCompose/service/validator/ValidatorService";
import {combineValidator} from "./CombineValidators";
import {env, volumes} from "../../domain/dockerCompose/models/DockerImage";

const {
    ServiceNameNeedAnAlias,
    EnvKeyMustBeRelateToValue,
    EnvValueMustBeRelateToKey,
    VolumeHostMustBeRelateToContainer,
    VolumeContainerMustBeRelateToHost,
} = ValidatorService

export const ServiceNameValidator = (allServiceName?: string[]) => (value: string) =>
    combineValidator(
        portUIValidator,
        ServiceNameNeedAnAlias(allServiceName))(value);

export const envKeyValidator = (env : env) => (value : string) => combineValidator(
    EnvKeyMustBeRelateToValue(env),
    envVariableNameUIValidator
)(value)

export const envValueValidator = (env : env) => (value : string) => combineValidator(
    EnvValueMustBeRelateToKey(env),
    envVariableValueUIValidator
)(value)

export const VolumeHostValidator = (volume : volumes) => (value : string) => combineValidator(
    VolumeHostMustBeRelateToContainer(volume),
    volumesUIValidator
)(value)

export const VolumeContainerValidator = (volume : volumes) => (value : string) => combineValidator(
    VolumeContainerMustBeRelateToHost(volume),
    volumesUIValidator
)(value)