import {IFormatRepository} from "../../domain/imageReference/ports/FormatPorts";
import YAML from "yaml";
import {error, success} from "../../domain/utils/maybe/Maybe";
import {InfrastructureException} from "../../domain/utils/exception/type";
import {DATA_IS_EMPTY} from "../../domain/utils/exception/InfrastructureException";
import {dataToParse} from "../../domain/imageReference/service/format/type";

const toYaml = async (data: dataToParse) => {
    if (!data || data.toString().length === 0)
        return error<InfrastructureException>(DATA_IS_EMPTY);

    const yaml = new YAML.Document(data)

    return success(yaml);
};


const yamlTO = async (data: dataToParse) => {
    if (!data || data.toString().length === 0)
        return error<InfrastructureException>(DATA_IS_EMPTY);

    const result = YAML.parse(data);

    return success(result);
};

export const FormatRepository: IFormatRepository = {
    toYaml,
    yamlTO,
};

