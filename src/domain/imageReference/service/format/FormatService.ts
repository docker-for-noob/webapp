import { IFormatService } from "../../ports/FormatPorts";
import { FormatRepository } from "../../../../infrastructure/repositories/FormatRepository";
import { DockerCompose, DockerContainer } from "../../models/DockerImage";
import { Maybe } from "../../../utils/maybe/Maybe";
import {
    formatImageName,
    formatEnvVarToKVPObject,
    formatIEArrayToStringArray,
} from "./FormatHelpers";
import {
    container,
    containerName,
    DockerComposeVersion,
    Env,
    Link,
    Ports,
    restart,
    Volumes
} from "../../constants/InputName";
import {noContainerFoundError} from "../../../utils/exception/DomainException";

const { toYaml } = FormatRepository;

const formatDockerComposeToYaml = async (data: DockerCompose): Promise<Maybe<DockerCompose>> => {
    const FormattedData = {
        version: data[DockerComposeVersion],
        services: data[container].reduce((acc: {}, container: DockerContainer) => {
            acc[container.serviceName] = {
                "container_name": container[containerName],
                "image": formatImageName(container),
                "ports": formatIEArrayToStringArray(container[Ports]),
                "volumes": formatIEArrayToStringArray(container[Volumes]),
                "environment": formatEnvVarToKVPObject(container[Env]),
                "link": container[Link],
                "restart": container[restart]
            }
            return acc;
        }, {})
    }
    if (FormattedData.services === {}) return noContainerFoundError;

    return toYaml(FormattedData);
};

export const FormatService: IFormatService = {
  formatDockerComposeToYaml,
};
