import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './hooks/storeHooks';
import {getImageReferences} from "@domain/imageReference/store/imageReference/selectors";
import {RootState} from "@domain/utils/store/type";
import {useGetAllArticlesQuery} from "@domain/api/apiSlice";
import {DownloaderService} from "@domain/imageReference/service/downloader/DownloaderService";
import {imageReferences} from "@domain/imageReference/constants/seed";

export function App() {
    const dispatchStore = useAppDispatch();
    const {data} = useGetAllArticlesQuery()
    const imageReference = useAppSelector((state: RootState) => (getImageReferences(state)));

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => DownloaderService.downloadDockerCompose("test43", imageReferences)}>Download
                    YAMLssdgsd
                </button>
                {JSON.stringify(data)}
            </header>
        </div>
    );
}

export default App;
