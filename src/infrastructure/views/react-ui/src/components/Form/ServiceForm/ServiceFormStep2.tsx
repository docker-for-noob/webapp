import { DockerContainer } from "@core/domain/dockerCompose/models/DockerImage";
import { Card, CardContent, Typography, CardActions, Button, Grid, Autocomplete, TextField, Box } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent, useCallback } from "react";
import { InputTextForm } from "../../FormInput/BaseInput";
import { mockImages } from "../../../mock/ServiceFormMock";
import { apiSlice } from "../../../../../../redux/api/apiSlice";
import { ImageType, VersionType } from "./ServiceForm";
import { PopulateImageDTO } from "../../../../../../redux/api/DTO";
import { imageParams } from "../../../../../../redux/api/requestParams";
import { imageTypeUIValidator, versionUIValidator, tagsUIValidator } from "@infrastructure/validators/InputValidator";

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
  
    const [chosenImage, setChosenImage] = useState<string>('');
    const [chosenVersion, setChosenVersion] = useState<string>('');
    const [chosenTags, setChosenTags] = useState<string>('');
    const [fullImageList, setFullImageList] = useState<Array<string>>([]);
    const [imageList, setImageList] = useState<Array<string>>([]);
    const [versionList, setVersionList] = useState<Array<string>>([]);
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
    const populateImageQuery = usePopulateImageQuery();
    const populateVersionQuery = usePopulateVersionQuery({ image: chosenImage });
    const populateTagQuery = usePopulateTagQuery({ image: chosenImage, version: chosenVersion });


    useEffect(() => {
      const {
        data: populatedImage,
        error: imageError,
        isLoading: imageLoading,
      } = populateImageQuery;
      //console.log(populatedImage, imageError, imageLoading);
      setFullImageList(populatedImage?.Images ?? []);
    }, [populateImageQuery]);  

    useEffect(() => {
      const {
        data: populatedVersion,
        error: versionError,
        isLoading: versionLoading
      } = populateVersionQuery;
      //console.log(populatedVersion, versionError, versionLoading);
      setVersionList(populatedVersion?.Versions ?? []);
    }, [populateVersionQuery]);

  useEffect(() => {
    const {
      data: populatedTag,
      error: tagError,
      isLoading: tagLoading
    } = populateTagQuery;
    //console.log(populatedTag, tagError, tagLoading);
    console.log(populatedTag);
    const tmpTags = populatedTag ?? [];
    const tags: Array<string> = [];
    tmpTags.forEach(tag => {
      tags.push(tag.Name);
    });
    setTagList(tags);
  }, [populateTagQuery]);
      
    useEffect(() => {
      props.setContainer((prev: DockerContainer) => {
        return {
          ...prev,
          ImageName: chosenImage,
          Tag: chosenTags
        }
      })
    }, [chosenImage, chosenVersion, chosenTags]);

    const handleChooseImage = (image: string) => {
      setChosenImage(image);
      setImageSearchInput(image);
      setImageList([]);
      setChosenVersion('');
      setVersionInputActive(true);
      setImageInputActive(false);
    };
  
    const handleChangeVersion = (version: string | null) => {
      if (version !== null && version !== "") {
        setVersionSearchInput(version);
        setChosenVersion(version);
        setTagInputActive(true);
        setVersionInputActive(false);
      } else {
        setVersionSearchInput("");
        setChosenVersion('');
        setTagList([]);
        setTagInputActive(false);
      }
    };
  
    const handleChangeTags = (tags: string | null) => {
      setChosenTags(tags ?? '');
    }
  
    const handleImageFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
      setImageSearchInput(event.target.value);
      const listToFilter = fullImageList ?? [];
      if (event.target.value != '') {
        setImageList(
          listToFilter
            .filter((image) =>
              image
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
        setChosenVersion('');
        setVersionSearchInput("");
      } else if (step === 2) {
        setVersionInputActive(true);
        setTagInputActive(false);
        setChosenTags('');
        setTagSearchInput("");
      }
    }
    interface ImageCardType {
      image: string;
    }

    const ImageCard = (image: ImageCardType) => {

      const generateImageUrl =(imageName: string) => {
        return process.env.REACT_APP_IMAGE_URL + "/library-" + imageName + "-logo.png";
      };

      const defaultImage = "https://cdn-icons-png.flaticon.com/512/3037/3037071.png";

      return (
        <Card sx={{ backgroundColor: "#F0F0F0", margin: "0 0.5rem" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={generateImageUrl(image.image)}
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
                alt={image.image}
                style={{ width: 64, height: 64, marginRight: "1rem" }}
              />
              <Typography variant="h6" component="div" style={{ overflowWrap: "anywhere" }}>
                {image.image}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              sx={{ margin: "0.5rem 1rem" }}
              onClick={() => handleChooseImage(image.image)}
            >
              Choisir
            </Button>
          </CardActions>
        </Card>
      );
    };
  
    return (
      <form style={{ display: "flex", flexDirection: "column", padding: '1rem' }}>
        <InputTextForm 
        variant="filled"
        label="Rechercher un type d'image"
        value={imageSearchInput}
        onChange={handleImageFilterInput}
        disabled={!isImageInputActive}
        error={imageTypeUIValidator(chosenImage)?.error} />
        <Grid container spacing={2}>
          {imageList.map((image) => (
            <Grid item xs={6} key={image}>
              <ImageCard image={image}/>
            </Grid>
          ))}
        </Grid>
  
        <Autocomplete
          id="version-select"
          options={versionList}
          autoHighlight
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ margin: '1rem 0' }}
              label="Choisissez une version"
              variant="filled"
              helperText={versionUIValidator(chosenVersion)?.error}
              error={!!versionUIValidator(chosenVersion)?.error}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          value={chosenVersion}
          onChange={(_event: any, newValue: string | null) => {
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
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ margin: '0 0 1rem 0' }}
              label="Choisissez vos tags"
              variant="filled"
              helperText={tagsUIValidator(chosenTags)?.error}
              error={!!tagsUIValidator(chosenTags)?.error}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
          value={chosenTags}
          onChange={(_event: any, newValue: string | null) => {
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