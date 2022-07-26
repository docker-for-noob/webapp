import React from 'react';
import './App.css';
import {useAppDispatch} from './hooks/storeHooks';
import {useGetAllArticlesQuery} from "@infrastructure/redux/api/apiSlice";
import {BackendSeed} from "@infrastructure/mock/backendSeed";
import {getError, getResult, isSuccess} from "@core/application/commons/maybe/Maybe";
import {downloadDockerCompose} from "@core/application/downloader/Downloader";

export function App() {
    const dispatchStore = useAppDispatch();
    const {data} = useGetAllArticlesQuery()

    const download = async () => {
        const result = await downloadDockerCompose("test43", BackendSeed)

        if (isSuccess(result)) console.log(getResult(result))
        if (getError(result)) console.log(getError(result))
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => download()}>Download
                    YAML
                </button>
                {JSON.stringify(data)}
            </header>
        </div>
    );
}


