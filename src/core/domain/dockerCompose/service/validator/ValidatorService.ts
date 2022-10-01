import {IValidatorService} from "../../ports/ValidatorsPorts";

import {suggest, error, Suggest, warning} from "../../../../application/commons/maybe/Maybe";
import {defaultPorts, HostContainer, port} from "../../models/DockerImage";
import {Validator} from "../../../../application/validators/type/type";
import {formatPrimitiveHCToString} from "../../../../application/downloader/format/FormatHelpers";


const suggestPort = (value): Suggest<string> => suggest<string>(`${formatPrimitiveHCToString(value)} is a default port, its preferable to use a different port`);

const isDefaultPort = (defaultPort?: defaultPorts): Validator => (value: port) => {
    if (defaultPort) {
        const result = defaultPort.find(p => p.container === value.container && p.host === value.host);
        if (result) suggestPort(value);
    }
    return undefined;
}

const hostPortMustBeUnique = (usedPort?: HostContainer<string>[]): Validator => (value: port) => {
    if (usedPort) {
        const hostPortResult = usedPort.find(p => p.host === value.host);
        if (hostPortResult) error(`The host port ${hostPortResult.container} is already used`);
    }
    return undefined;
}

const ServiceNameNeedAnAlias = (value?: string []): Validator => (actual: string) => {
    if (IsServiceUnique(actual)(value)) {
        return undefined;
    } else {
        if (!value) warning(`The service ${actual} must have an alias`);
    }
}

const IsServiceUnique = (actual: string) => (value?: string []): boolean => {
    if (value) {
        const result = value.find(p => p === actual);
        return result === undefined
    }
    return true
}

const ensureDBRootEnvVariable = (actual: { userName: string, password: string }) => {
    if (!isDefaultRootPassword(actual.password)) {
        return warning(`The Database Root Password is the default password, its it is preferable to change it`);
    }
    if (!isDefaultRootUsername(actual.userName)) {
        return warning(`The Database Rot username is the default password, its it is preferable to change it`);
    }


const isDefaultRootPassword = (actual: string) => {
    const defaultPassword = ["root", "password", "admin"]
    const result = defaultPassword.find(p => p === actual)
    return result === undefined
}

const isDefaultRootUsername = (actual: string) => {
    const defaultUsername = ["root", "admin"]
    const result = defaultUsername.find(p => p === actual)
    return result === undefined
}


export const ValidatorService: IValidatorService = {
    isDefaultPort,
    hostPortMustBeUnique,
    ServiceNameNeedAnAlias,
    ensureDBRootEnvVariable
};
