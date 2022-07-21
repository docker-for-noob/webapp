import React, {useEffect, useState} from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import {useAppDispatch} from './hooks/storeHooks';
import {useGetAllArticlesQuery} from "@domain/api/apiSlice";
import {DownloaderService} from "@domain/imageReference/service/downloader/DownloaderService";
import {getError, getResult, isSuccess} from "@domain/utils/maybe/Maybe";

function Test() {
    return (
        <div>
            <button onClick={() => download()}>Download
                YAMLssdgsd
            </button>
            {JSON.stringify(data)}
        </div>
    )
}

export function App() {
    const dispatchStore = useAppDispatch();
    const {data} = useGetAllArticlesQuery()
    const {downloadDockerCompose} = DownloaderService

    const download = async () => {
        const result = await downloadDockerCompose("test43", "")
        console.log(result)
        if (isSuccess(result)) console.log(getResult(result))
        if (getError(result)) console.log(getError(result))
    }

    return (
        <div className="App">   
            <Routes>
                <Route path="/" element={<Test />} />
            </Routes>  
        </div>
    );
}

