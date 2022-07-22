import { Maybe } from "../../utils/maybe/Maybe";
import { dataToParse } from "../service/format/type";
import { DockerCompose } from "../models/DockerImage";

export interface IFormatService {
  formatDockerComposeToYaml: (
    data: DockerCompose
  ) => Promise<Maybe<DockerCompose>>;
}

export interface IFormatRepository {
  toYaml: (data: dataToParse) => Promise<Maybe<dataToParse>>;
  yamlTO: (data: dataToParse) => Promise<Maybe<dataToParse>>;
}
