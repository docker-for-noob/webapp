import {IFormatRepository} from "../../domain/imageReference/ports/FormatPorts";
import YAML from "yaml";

const toYaml = (data: any) => YAML.stringify(data).replaceAll(`'"`, '"').replaceAll(`"'`, `"`);


export const FormatRepository: IFormatRepository = {
    toYaml
}