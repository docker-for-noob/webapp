import {IDownloaderService} from "../../ports/DownloaderPorts";
import {DownloaderRepository} from "../../../../infrastructure/repositories/DownloaderRepository";
import {dataToDownload, fileName} from "./type";
import {FormatService} from "../format/FormatService";
import {TypeApplicationYaml} from "./DownloaderHelpers";
import {isError} from "../../../utils/maybe/Maybe";

const {
    inBrowser
} = DownloaderRepository

const {
    formatDockerCompose
} = FormatService

const downloadDockerCompose = async (filename: fileName, data: dataToDownload) => {
    const FormattedYaml = await formatDockerCompose(data)

    if (isError<string>(FormattedYaml)) return FormattedYaml

    return inBrowser(filename, FormattedYaml, TypeApplicationYaml)
}

export const DownloaderService: IDownloaderService = {
    downloadDockerCompose
}