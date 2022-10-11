import { DockerCompose } from "../../../domain/dockerCompose/models/DockerImage";
import { Maybe } from "../../commons/maybe/Maybe";
import { yamlAdapter } from "../../../../infrastructure/format/yaml/YamlAdapter";
import { noContainerFoundError } from "./FormatterException";
import { Document } from "yaml";
import { toYaml } from "../../../../infrastructure/format/yaml/FormatDependency";
import YAML from "yaml";


const formatDockerComposeToYaml = async (
  data: DockerCompose
): Promise<Maybe<Document>> => {
  const FormattedData = yamlAdapter(data);

  if (FormattedData.services === {}) return noContainerFoundError;

  return toYaml(FormattedData);
};

const formatDockerComposeToPrevisualisation = (data: DockerCompose): string => {

  const FormattedData = yamlAdapter(data);

  return YAML.stringify(FormattedData)
}

export { formatDockerComposeToYaml, formatDockerComposeToPrevisualisation };
