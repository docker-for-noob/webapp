import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {REHYDRATE} from "redux-persist/es/constants";
import {
    getAllTagsFromImageVersion,
    GetImageReference,
    populateImagesEndpoint,
    populateVersionEndpoint,
} from "./endpoint";
import {
    ImageReferenceDTO,
    PopulateImageDTO,
    TagsFromImageVersionDTO,
    VersionsFromImageDTO
} from "./DTO";
import {
    DockerHubRequest,
    imageParams
} from "./requestParams";

const API_URL = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
    reducerPath: "api",
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === REHYDRATE) {
            return action.payload[reducerPath];
        }
    },
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: (builder) => ({
        populateImage: builder.query<PopulateImageDTO, void>({
            query: () => populateImagesEndpoint,
        }),
        populateVersion: builder.query<VersionsFromImageDTO, imageParams>({
            query: ({image} : imageParams) => populateVersionEndpoint(image),
        }),
        populateTag: builder.query<TagsFromImageVersionDTO, DockerHubRequest>({
            query: (data: DockerHubRequest) => getAllTagsFromImageVersion(data),
        }),
        fetchImageReference: builder.query<ImageReferenceDTO, imageParams>({
            query: ({image} : imageParams) => GetImageReference(image),
        }),
    }),
});

export const {
    usePopulateImageQuery,
    usePopulateVersionQuery,
    usePopulateTagQuery,
    useFetchImageReferenceQuery,
} = apiSlice;

