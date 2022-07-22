import React from 'react';
import './App.css';
import {useAppDispatch} from './hooks/storeHooks';
import {useGetAllArticlesQuery} from "@domain/api/apiSlice";
import {DownloaderService} from "@domain/imageReference/service/downloader/DownloaderService";
import {getError, getResult, isSuccess} from "@domain/utils/maybe/Maybe";
import {BackendSeed} from "@domain/imageReference/constants/backendSeed";

export function App() {
    const dispatchStore = useAppDispatch();
    const {data} = useGetAllArticlesQuery()
    const {downloadDockerCompose} = DownloaderService

    const download = async () => {
        const result = await downloadDockerCompose("test43", BackendSeed)

        if (isSuccess(result)) console.log(getResult(result))
        if (getError(result)) console.log(getError(result))
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => download()}>Download
                    YAMLssdgsd
                </button>
                {JSON.stringify(data)}
            </header>
        </div>
    );
}


