import {
  DockerCompose,
  DockerContainer,
} from "../../../core/domain/dockerCompose/models/DockerImage";
import {
  formatEnvVarToKVPObject,
  formatHCArrayToStringArray,
  formatImageName,
} from "../../../core/application/downloader/format/FormatHelpers";

export const yamlAdapter = (data: DockerCompose) => {
  return {
    version: data.DockerComposeVersion,
    services: data.Container.reduce((acc: {}, container: DockerContainer) => {
      acc[container.ServiceName] = {
        container_name: container.ContainerName,
        image: formatImageName(container),
        ports: formatHCArrayToStringArray(container.Ports),
        volumes: formatHCArrayToStringArray(container.Volumes),
        environment: formatEnvVarToKVPObject(container.Env),
        link: container.Link,
        restart: container.Restart,
      };
      return acc;
    }, {}),
  };
};
