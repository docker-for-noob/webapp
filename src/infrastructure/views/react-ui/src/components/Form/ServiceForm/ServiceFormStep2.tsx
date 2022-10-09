import { DockerContainer } from "@core/domain/dockerCompose/models/DockerImage";
import { Card, CardContent, Typography, CardActions, Button, Grid, Autocomplete, TextField, Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from "react";
import { InputTextForm } from "src/components/FormInput/BaseInput";
import { mockImages } from "src/mock/ServiceFormMock";
import { apiSlice } from "../../../../../../redux/api/apiSlice";
import { ImageType, VersionType } from "./ServiceForm";

interface ServiceFormStep2Props {
    setDisableNext: (disable: boolean) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>
}

export function ServiceFormStep2(props: ServiceFormStep2Props) {
    const defaultImage = {
      id: 0,
      name: "",
      versions: [],
      isUtils: false,
    };
  
    const defaultVersion = { version: '', tags: [] };
  
    const [chosenImage, setChosenImage] = useState<ImageType>(defaultImage);
    const [chosenVersion, setChosenVersion] = useState<VersionType>(defaultVersion);
    const [chosenTags, setChosenTags] = useState<Array<string>>([]);
    const [imageList, setImageList] = useState<Array<ImageType>>([]);
    const [versionList, setVersionList] = useState<Array<VersionType>>([]);
    const [tagList, setTagList] = useState<Array<string>>([]);
    const [imageSearchInput, setImageSearchInput] = useState("");
    const [versionSearchInput, setVersionSearchInput] = useState("");
    const [tagSearchInput, setTagSearchInput] = useState("");
    const [isImageInputActive, setImageInputActive] = useState(true);
    const [isVersionInputActive, setVersionInputActive] = useState(false);
    const [isTagInputActive, setTagInputActive] = useState(false);
    const {
      usePopulateImageQuery,
        usePopulateVersionQuery,
        usePopulateTagQuery,
        useFetchImageReferenceQuery,
    } = apiSlice;
    let isDataLoaded = false;
    const populateImageQuery = usePopulateImageQuery();
  
    useEffect(() => {
      const {data} = populateImageQuery;
      console.log(data);
      isDataLoaded = true;
    }, []);
  
      
    useEffect(() => {
      props.setContainer((prev: DockerContainer) => {
        return {
          ...prev,
          ImageName: chosenImage.name + ':' + chosenVersion.version,
          Tag: chosenTags.join('-')
        }
      })
    }, [chosenImage, chosenVersion, chosenTags]);
  
  
    const chooseImage = (image: ImageType) => {
      setChosenImage(image);
      setImageSearchInput(image.name);
      setImageList([]);
      setVersionList(image.versions);
      setChosenVersion(defaultVersion);
      setVersionInputActive(true);
      setImageInputActive(false);
    };
  
    const handleChangeVersion = (version: VersionType | null) => {
      if (version !== null && version.version !== "") {
        setVersionSearchInput(version.version);
        setChosenVersion(version);
        setTagList(version.tags);
        setTagInputActive(true);
        setVersionInputActive(false);
      } else {
        setVersionSearchInput("");
        setChosenVersion(defaultVersion);
        setTagList([]);
        setTagInputActive(false);
      }
    };
  
    const handleChangeTags = (tags: string[]) => {
      setChosenTags(tags);
    }
  
    const handleImageFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
      setImageSearchInput(event.target.value);
      const listToFilter = mockImages;
      if (event.target.value != '') {
        setImageList(
          listToFilter
            .filter((image) =>
              image.name
                .toLowerCase()
                .startsWith(event.target.value.toLowerCase())
            )
            .slice(0, 9)
        );
      } else {
        setImageList([]);
      }
    };
  
    const handleNextStep = (step: number) => {
      if (step === 1) {
        setImageInputActive(false);
        setVersionInputActive(true);
      } else if (step === 2) {
        setVersionInputActive(false);
        setTagInputActive(true);
      }
    }
  
    const handlePreviousStep = (step: number) => {
      if (step === 1) {
        setImageInputActive(true);
        setVersionInputActive(false);
        setChosenVersion(defaultVersion);
        setVersionSearchInput("");
      } else if (step === 2) {
        setVersionInputActive(true);
        setTagInputActive(false);
        setChosenTags([]);
        setTagSearchInput("");
      }
    }
  
    const ImageCard = (image: ImageType) => {
      return (
        <Card sx={{ backgroundColor: "#F0F0F0", margin: "0 0.5rem" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {image.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              sx={{ margin: "0.5rem 1rem" }}
              onClick={() => chooseImage(image)}
            >
              Choisir
            </Button>
          </CardActions>
        </Card>
      );
    };
  
    return (
      <form style={{ display: "flex", flexDirection: "column", padding: '1rem' }}>
        <InputTextForm variant="filled" label="Rechercher un type d'image" value={imageSearchInput} onChange={handleImageFilterInput} disabled={!isImageInputActive} />
        <Grid container spacing={2}>
          {imageList.map((image) => (
            <Grid item xs={6} key={image.id}>
              <ImageCard {...image} />
            </Grid>
          ))}
        </Grid>
  
        <Autocomplete
          id="version-select"
          options={versionList}
          autoHighlight
          getOptionLabel={(option) => option.version}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ margin: '1rem 0' }}
              label="Choisissez une version"
              variant="filled"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          value={chosenVersion}
          onChange={(_event: any, newValue: VersionType | null) => {
            handleChangeVersion(newValue);
          }}
          disabled={!isVersionInputActive}
        />
        {isVersionInputActive &&
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="secondary" variant='contained' onClick={() => handlePreviousStep(1)} sx={{ margin: '0.5rem 1rem' }}>Précédent</Button>
          </Box>
        }
  
        <Autocomplete
          id="tag-select"
          options={tagList}
          autoHighlight
          getOptionLabel={(option) => option}
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ margin: '0 0 1rem 0' }}
              label="Choisissez vos tags"
              variant="filled"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          value={chosenTags}
          onChange={(_event: any, newValue: string[]) => {
            handleChangeTags(newValue);
          }}
          disabled={!isTagInputActive}
        />
  
        {isTagInputActive &&
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="secondary" variant='contained' onClick={() => handlePreviousStep(2)} sx={{ margin: '0.5rem 1rem' }}>Précédent</Button>
          </Box>
        }
      </form>
    );
  }