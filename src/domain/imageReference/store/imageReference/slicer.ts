import {createSlice} from '@reduxjs/toolkit';
import {imageReferences} from "../../constants/seed";
import {enhancedImageReference} from "./type";



const mockedImage: enhancedImageReference = {
    ...imageReferences[0],
    actualStep: "env",
    step: {
        workdir: false,
    }
}


const initialState: enhancedImageReference[] =[mockedImage] ;

const imageReferenceSlice = createSlice({
    name: 'imageReferenceStore',
    initialState: initialState,
    reducers: {},
});

export const {
} = imageReferenceSlice.actions;

export default imageReferenceSlice.reducer;