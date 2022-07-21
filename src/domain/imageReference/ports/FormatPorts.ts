import {Maybe} from "../../utils/maybe/Maybe";
import {dataToParse} from "../service/format/type";
import {DockerCompose} from "../models/DockerImage";

export interface IFormatService {
    formatDockerCompose: (data: dataToParse) => Promise<Maybe<dataToParse>>;
}

export interface IFormatRepository {
    dockerComposeToYaml: (data: DockerCompose) => Promise<Maybe<dataToParse>>;
    yamlTO: (data: dataToParse) => Promise<Maybe<dataToParse>>;
}
