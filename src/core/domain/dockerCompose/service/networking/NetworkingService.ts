import {HostContainer, port} from "../../models/DockerImage";
import {INetworkingServices} from "../../ports/NetworkingPorts";

export type range = {
    start: number,
    end: number
}


const generateNewHostPort = (actual: HostContainer<string>) => (UsedPorts?: HostContainer<string>[]): port => {

    const usedHostPortNumber = UsedPorts?.map(p => parseInt(p.host)).filter(p => !isNaN(p));
    const authorizedPorts: range = {
        start: 1023,
        end: 65535
    }

    const splitHost = actual.host.split(":")
    let hostFirstPart = ""
    const isAnIp = splitHost.length > 1

    if (isAnIp) hostFirstPart = splitHost[0] + ":"

    let newHostPort = isAnIp ? parseInt(splitHost[splitHost.length - 1]) : parseInt(actual.host);

    while (usedHostPortNumber?.includes(newHostPort)) {
        newHostPort += 1;

        if (newHostPort > authorizedPorts.end) {
            newHostPort = authorizedPorts.start;
        }
    }

    return {
        host: hostFirstPart + newHostPort.toString(),
        container: actual.container
    };
}

export const NetworkingService: INetworkingServices = {
    generateNewHostPort,
}




