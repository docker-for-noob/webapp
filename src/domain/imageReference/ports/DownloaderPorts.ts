import { dataToDownload, fileName } from "../service/downloader/type";
import { Maybe } from "../../utils/maybe/Maybe";

export interface IDownloaderService {
  downloadDockerCompose: (
    filename: fileName,
    data: dataToDownload
  ) => Promise<Maybe<string>>;
}

export interface IDownloaderRepository {
  inBrowser: (
    filename: fileName,
    data: dataToDownload,
    options?: BlobPropertyBag
  ) => Promise<Maybe<string>>;
}
