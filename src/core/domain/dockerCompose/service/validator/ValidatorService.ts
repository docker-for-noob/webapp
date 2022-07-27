import {IValidatorService} from "../../ports/ValidatorsPorts";

import {suggest, error, Suggest} from "../../../../application/commons/maybe/Maybe";
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

const ServiceNameNeedAnAlias = (actual: string) => (value?: string []) => {
    // if(ServiceMustBeUnique(actual)(value) ) return;
    if(!value) error(`The service ${actual} must have an alias`);
}




const ServiceMustBeUnique = (actual: string) => (value?: string [])   => {
    if(value) {
        const result = value.find(p => p === actual);
        if (result) error(`The service ${actual} is already used`);
    }
}


export const ValidatorService: IValidatorService = {
    isDefaultPort,
    hostPortMustBeUnique
};
