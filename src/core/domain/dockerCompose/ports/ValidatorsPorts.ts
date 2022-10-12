import {defaultPorts, env, HostContainer, port, volumes} from "../models/DockerImage";
import {Validator} from "../../../application/validators/type/type";

export interface IValidatorService {
    isDefaultPort: (defaultPort?: defaultPorts) => Validator;
    hostPortMustBeUnique: (usedPort?: HostContainer<string>[]) => Validator;
    ServiceNameNeedAnAlias: (value?: string[]) => Validator;
    EnvKeyMustBeRelateToValue: (env:env) =>Validator,
    EnvValueMustBeRelateToKey: (env : env) =>Validator,
    VolumeHostMustBeRelateToContainer: (value: volumes) =>Validator,
    VolumeContainerMustBeRelateToHost: (value: volumes) =>Validator,
    IsServiceUnique: (actual: string) => (value?: string[]) => boolean;
}
