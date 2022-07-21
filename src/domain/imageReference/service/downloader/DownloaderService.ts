import {IDownloaderService} from "../../ports/DownloaderPorts";
import {DownloaderRepository} from "../../../../infrastructure/repositories/DownloaderRepository";
import {dataToDownload, fileName} from "./type";
import {FormatService} from "../format/FormatService";
import {TypeApplicationYaml} from "./DownloaderHelpers";
import {getResult, isError, Maybe} from "../../../utils/maybe/Maybe";
import {dataToParse} from "../format/type";

const {inBrowser} = DownloaderRepository;
const {formatDockerCompose} = FormatService;

const downloadDockerCompose = async (
    filename: fileName,
    data: dataToDownload
) => {
    const FormattedYaml: Maybe<dataToParse> = await formatDockerCompose(data);

    if (isError<string>(FormattedYaml)) return FormattedYaml;

    return inBrowser(filename, getResult(FormattedYaml), TypeApplicationYaml);
};

export const DownloaderService: IDownloaderService = {
    downloadDockerCompose,
};
