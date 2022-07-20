import {data, fileName} from "../service/Downloader/type";

export interface IDownloaderService {
    downloadDockerCompose: (filename: fileName, data: data) => void
}

export interface IDownloaderRepository {
    inBrowser: (filename: fileName, data: data, options?: BlobPropertyBag) => void
}