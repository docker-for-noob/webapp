import {error, Maybe, success} from "../../core/application/commons/maybe/Maybe";
import {InfrastructureException} from "../../core/application/commons/exception/exception";
import {
    BLOB_IS_EMPTY,
    BLOB_IS_NOT_A_VALID_TYPE,
} from "./DownloadException";
import {Document} from "yaml";

const inBrowser = async (filename: string, data: any, option): Promise<Maybe<any>> => {
    const blob = new Blob([data], option);

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

export const DownloaderDependency = {
    inBrowser,
};
