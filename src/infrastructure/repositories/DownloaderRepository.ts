import {IDownloaderRepository} from "../../domain/imageReference/ports/DownloaderPorts";
import {data, fileName} from "../../domain/imageReference/service/Downloader/type";

const inBrowser = (filename: fileName, data: data, option) => {
    const blob = new Blob([data], option);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

export const DownloaderRepository: IDownloaderRepository = {
    inBrowser
}