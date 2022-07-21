import {IFormatRepository} from "../../domain/imageReference/ports/FormatPorts";
import YAML from "yaml";
import {error, success} from "../../domain/utils/maybe/Maybe";
import {InfrastructureException} from "../../domain/utils/exception/type";
import {DATA_IS_EMPTY} from "../../domain/utils/exception/InfrastructureException";
import {dataToParse} from "../../domain/imageReference/service/format/type";
import {
    container,
    containerName,
    DockerCompose,
    DockerComposeVersion,
    Env,
    ImageName,
    Link,
    Ports,
    restart,
    serviceName,
    Tag,
    Version,
    Volumes
} from "../../domain/imageReference/models/DockerImage";

const dockerComposeToYaml = async (data: DockerCompose) => {
    if (!data || data.toString().length === 0)
        return error<InfrastructureException>(DATA_IS_EMPTY);

    const yaml = new YAML.Document({
        version: data[DockerComposeVersion]
    })

    data[container].forEach(container => {
        const service = container[serviceName];
        yaml.add({
            [service]: {
                "container_name": container[containerName],
                "image": container[ImageName] + ":" + container[Tag] + ":" + container[Version],
                "ports": container[Ports]?.map(port => port.external + ":" + port.internal),
                "volumes": container[Volumes]?.map(volume => volume.internal + ":" + volume.external),
                "environment": container[Env]?.map(env => env.key + "=" + env.value),
                [Link]: container.link,
                [restart]: container[restart]
            }
        });
    });


    return success(yaml);
};

const yamlTO = async (data: dataToParse) => {
    if (!data || data.toString().length === 0)
        return error<InfrastructureException>(DATA_IS_EMPTY);

    const result = YAML.parse(data);

    return success(result);
};

export const FormatRepository: IFormatRepository = {
    dockerComposeToYaml,
    yamlTO,
};

