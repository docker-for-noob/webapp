import YAML from "yaml";
import {error, Maybe, success} from "../../../core/application/commons/maybe/Maybe";
import {InfrastructureException} from "../../../core/application/commons/exception/exception";
import {DATA_IS_EMPTY} from "../../download/DownloadException";
import {Document} from "yaml";

const toYaml = async (data: any) : Promise<Maybe<Document>> => {
    if (!data || data.toString().length === 0)
        return error<InfrastructureException>(DATA_IS_EMPTY);

    const yaml = new YAML.Document(data)

    return success(yaml);
};

export {
    toYaml,
};

