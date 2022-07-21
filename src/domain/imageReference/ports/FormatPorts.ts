import {Maybe} from "../../utils/maybe/Maybe";
import {dataToParse} from "../service/format/type";

export interface IFormatService {
    formatDockerCompose: (data: dataToParse) => Promise<Maybe<dataToParse>>
}

export interface IFormatRepository {
    toYaml: (data: dataToParse) => Promise<Maybe<dataToParse>>
    yamlTO:(data: dataToParse) => Promise<Maybe<dataToParse>>
}