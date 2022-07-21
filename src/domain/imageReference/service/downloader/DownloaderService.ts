import {IDownloaderService} from "../../ports/DownloaderPorts";
import {DownloaderRepository} from "../../../../infrastructure/repositories/DownloaderRepository";
import {data, fileName} from "./type";
import {FormatService} from "../format/FormatService";

const {
    inBrowser
} = DownloaderRepository

const {
    formatDockerCompose
} = FormatService

const downloadDockerCompose = (filename: fileName, data: data) => {
    inBrowser(filename, formatDockerCompose(data), {type: 'application/x-yaml'})
}

export const DownloaderService: IDownloaderService = {
    downloadDockerCompose
}