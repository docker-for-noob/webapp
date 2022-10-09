import React from 'react';

import {BackendSeed} from "@infrastructure/mock/backendSeed";
import {getError, getResult, isSuccess} from "@core/application/commons/maybe/Maybe";
import {downloadDockerCompose} from "@core/application/downloader/Downloader";
import {
    useFetchImageReferenceQuery,
    usePopulateImageQuery,
    usePopulateTagQuery,
    usePopulateVersionQuery
} from "@infrastructure/redux/api/apiSlice";

export function ApiCallExample() {
    const {
        data: populatedImage,
        error: PopulatedError,
        isLoading: PopulatedLoading
    } = usePopulateImageQuery();  // mock de data du backend
    const {
        data: populatedVersion,
        error: versionError,
        isLoading: VersionLoading
    } = usePopulateVersionQuery({image: "php"}); // mock de data du backend
    const {
        data: PopulatedTags,
        error: populatedTagsError,
        isLoading: PopulatedTagsLoading
    } = usePopulateTagQuery({image: 'php', version: '7.4'}); // mock de data du backend
    const {
        data: imageReference,
        error: imageReferenceError,
        isLoading: imageReferenceLoading
    } = useFetchImageReferenceQuery({image: 'mysql:latest'}); // Data du MongoDB


    const download = async () => {
            const result = await downloadDockerCompose("test43", BackendSeed)

            if (isSuccess(result)) console.log(getResult(result))
            if (isSuccess(result)) console.log(getResult(result))
            if (getError(result)) console.log(getError(result))
            if (getError(result)) console.log(getError(result))
    }

    return (<>
            <button onClick={() => download()}>Download
                YAML
            </button>
            <div>
                <p>Populated Image: </p>
                {PopulatedLoading && <p>Loading...</p>}
                {JSON.stringify(populatedImage)}
                {PopulatedError && "Error :" + JSON.stringify(PopulatedError)}
            </div>

            <div>
                <p>Version :</p>
                {VersionLoading && <p>Loading...</p>}
                {JSON.stringify(populatedVersion)}
                {versionError && "Error :" + JSON.stringify(versionError)}
            </div>
            <div>
                <p>Tags : </p>
                {PopulatedTagsLoading && <p>Loading...</p>}
                {JSON.stringify(PopulatedTags)}
                {populatedTagsError && "Error :" + JSON.stringify(populatedTagsError)}
            </div>

            <div>
                <p>Image Details : </p>
                {imageReferenceLoading && <p>Loading...</p>}
                {JSON.stringify(imageReference)}
                {imageReferenceError && "Error :" + JSON.stringify(imageReferenceError)}
            </div>
        </>
    )}
