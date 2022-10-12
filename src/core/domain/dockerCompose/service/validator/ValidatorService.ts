import { IValidatorService } from "../../ports/ValidatorsPorts";
import { Suggest } from "../../../../application/commons/maybe/Maybe";
import {
  defaultPorts,
  env,
  HostContainer,
  port,
  volumes,
} from "../../models/DockerImage";
import { Validator } from "../../../../application/validators/type/type";
import {
  containerPathMustBeInput,
  defaultPortSuggest,
  hostPathMustBeInput,
  keyMustBeInput,
  portAlreadyInUse,
  serviceNeedAnAlias,
  valueMustBeInput,
} from "./ValidatorException";

const suggestPort = (value): Suggest<string> => defaultPortSuggest(value);

const isDefaultPort =
  (defaultPort?: port[]): Validator =>
  (value: port) => {
    if (defaultPort) {
      const result = defaultPort.find(
        (p) => p.container === value.container && p.host === value.host
      );
      if (result) return suggestPort(value);
    }
    return undefined;
  };

const hostPortMustBeUnique =
  (usedPort?: HostContainer<string>[]): Validator =>
  (value: port) => {
    if (usedPort) {
      const hostPortResult = usedPort.find((p) => p.host === value.host);
      if (hostPortResult) return portAlreadyInUse(hostPortResult);
    }
    return undefined;
  };

const ServiceNameNeedAnAlias =
  (value?: string[]): Validator =>
  (actual: string) => {
    if (IsServiceUnique(actual)(value)) {
      return undefined;
    } else {
      return serviceNeedAnAlias(actual);
    }
  };

const IsServiceUnique =
  (actual: string) =>
  (value?: string[]): boolean => {
    if (value) {
      const result = value.find((p) => p === actual);
      return result === undefined;
    }
    return true;
  };

const EnvKeyMustBeRelateToValue =
  (env: env): Validator =>
  () => {
    if (env.key == "" && env.value != "") return keyMustBeInput;
    return undefined;
  };

const EnvValueMustBeRelateToKey =
  (env: env): Validator =>
  () => {
    if (env.key != "" && env.value == "") return valueMustBeInput;
    return undefined;
  };

const VolumeHostMustBeRelateToContainer =
  (volumes: volumes): Validator =>
  () => {
    if (volumes.container != "" && volumes.host == "")
      return hostPathMustBeInput;
    return undefined;
  };

const VolumeContainerMustBeRelateToHost =
  (volumes: volumes): Validator =>
  () => {
    if (volumes.container == "" && volumes.host != "")
      return containerPathMustBeInput;
    return undefined;
  };

export const ValidatorService: IValidatorService = {
  isDefaultPort,
  hostPortMustBeUnique,
  ServiceNameNeedAnAlias,
  EnvKeyMustBeRelateToValue,
  EnvValueMustBeRelateToKey,
  VolumeHostMustBeRelateToContainer,
  VolumeContainerMustBeRelateToHost,
  IsServiceUnique,
};
