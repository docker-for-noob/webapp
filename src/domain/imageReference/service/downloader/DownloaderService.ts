import {IDownloaderService} from "../../ports/DownloaderPorts";
import {DownloaderRepository} from "../../../../infrastructure/repositories/DownloaderRepository";
import {fileName} from "./type";
import {FormatService} from "../format/FormatService";
import {TypeApplicationYaml} from "./DownloaderHelpers";
import {getResult, isError, Maybe} from "../../../utils/maybe/Maybe";
import {DockerCompose} from "../../models/DockerImage";

const {inBrowser} = DownloaderRepository;
const {formatDockerComposeToYaml} = FormatService;

const downloadDockerCompose = async (
    filename: fileName,
    data: DockerCompose
): Promise<Maybe<DockerCompose>> => {
    const FormattedYaml: Maybe<DockerCompose> = await formatDockerComposeToYaml(data);

    if (isError<DockerCompose>(FormattedYaml)) return FormattedYaml;

    return inBrowser(filename, getResult(FormattedYaml), TypeApplicationYaml);
};

export const DownloaderService: IDownloaderService = {
    downloadDockerCompose,
};
