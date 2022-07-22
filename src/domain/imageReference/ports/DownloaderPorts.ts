import { dataToDownload, fileName } from "../service/downloader/type";
import { Maybe } from "../../utils/maybe/Maybe";
import { DockerCompose } from "../models/DockerImage";

export interface IDownloaderService {
  downloadDockerCompose: (
    filename: fileName,
    data: DockerCompose
  ) => Promise<Maybe<DockerCompose>>;
}

export interface IDownloaderRepository {
  inBrowser: (
    filename: fileName,
    data: dataToDownload,
    options?: BlobPropertyBag
  ) => Promise<Maybe<dataToDownload>>;
}
