import {IDownloaderRepository} from "../../domain/imageReference/ports/DownloaderPorts";
import {
    dataToDownload,
    fileName,
} from "../../domain/imageReference/service/downloader/type";
import {error, success} from "../../domain/utils/maybe/Maybe";
import {InfrastructureException} from "../../domain/utils/exception/type";
import {
    BLOB_IS_EMPTY,
    BLOB_IS_NOT_A_VALID_TYPE,
} from "../../domain/utils/exception/InfrastructureException";

const inBrowser = async (filename: fileName, data: dataToDownload, option) => {
    const blob = new Blob([data], option);

    console.log(blob);
    if (blob.size === 0) return error<InfrastructureException>(BLOB_IS_EMPTY);
    if (blob.type === "unknown")
        return error<InfrastructureException>(BLOB_IS_NOT_A_VALID_TYPE(filename));

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);

    return success(`${filename} downloaded`);
};

export const DownloaderRepository: IDownloaderRepository = {
    inBrowser,
};
