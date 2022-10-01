import {defaultPorts, HostContainer, port} from "../models/DockerImage";
import {Validator} from "../../../application/validators/type/type";

export interface IValidatorService {
    isDefaultPort: (defaultPort?: defaultPorts) => Validator
    hostPortMustBeUnique: (usedPort?: HostContainer<string>[]) => Validator
    ServiceNameNeedAnAlias: (value?: string []) => Validator
    ensureDBRootEnvVariable: Validator

}
