import {IFormatService} from "../../ports/FormatPorts";
import {FormatRepository} from "../../../../infrastructure/repositories/FormatRepository";
import {
    DockerCompose,
    DockerContainer,
} from "../../models/DockerImage";
import {Maybe} from "../../../utils/maybe/Maybe";
import {
    formatImageName,
    formatEnvVarToKVPObject,
     formatIEToStringArray,
} from "./FormatHelpers";
import {
    container,
    containerName,
    DockerComposeVersion,
    Link,
    Ports,
    restart,
    Volumes
} from "../../constants/InputName";

const {toYaml} = FormatRepository;

// TODO refacto formatIEToStringArray for passing only 1 args
const formatDockerComposeToYaml = (data: DockerCompose): Promise<Maybe<DockerCompose>> => {
    const FormattedData = {
        version: data[DockerComposeVersion],
        services: data[container].reduce((acc: {}, container: DockerContainer) => {
            acc[container.serviceName] = {
                "container_name": container[containerName],
                "image": formatImageName(container),
                "ports": formatIEToStringArray(container[Ports]),
                "volumes": formatIEToStringArray(container[Volumes]),
                "environment": formatEnvVarToKVPObject(container),
                "link": container[Link],
                "restart": container[restart]
            }
            return acc;
        }, {})
    }
    return toYaml(FormattedData);
};


export const FormatService: IFormatService = {
    formatDockerComposeToYaml,
};
