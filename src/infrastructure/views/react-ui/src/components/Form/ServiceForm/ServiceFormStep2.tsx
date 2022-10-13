import {DockerContainer} from "@core/domain/dockerCompose/models/DockerImage";
import {Card, CardContent, Typography, CardActions, Button, Grid, Autocomplete, TextField, Box} from "@mui/material";
import React, {Dispatch, SetStateAction, useState, useEffect, ChangeEvent, useCallback} from "react";
import {InputTextForm} from "../../FormInput/BaseInput";
import {apiSlice} from "../../../../../../redux/api/apiSlice";
import {TagsFromImageVersionDTO} from "../../../../../../redux/api/DTO";
import {imageTypeUIValidator, versionUIValidator, tagsUIValidator} from "@infrastructure/validators/InputValidator";
import ContainerImage from "../../ContainerImage";
import {
    acquireHelperText,
    acquireValidationColor,
    handleError,
    handleFocus
} from "@core/application/commons/maybe/Maybe";
import {VersionValidator} from "@core/application/validators/InputValidators";

interface ServiceFormStep2Props {
    setDisableNext: (disable: boolean) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>;
    container: DockerContainer;
}

export function ServiceFormStep2(props: ServiceFormStep2Props) {

    const [chosenImage, setChosenImage] = useState<string>(props.container.ImageName.split(':')[0]);
    const [chosenVersion, setChosenVersion] = useState<string>(props.container.ImageName.split(':')[1] ?? '');
    const [chosenTags, setChosenTags] = useState<string>(props.container.Tag ?? '');
    const [fullImageList, setFullImageList] = useState<Array<string>>([]);
    const [imageList, setImageList] = useState<Array<string>>([]);
    const [versionList, setVersionList] = useState<Array<string>>([]);
    const [tagList, setTagList] = useState<Array<string>>([]);
    const [imageSearchInput, setImageSearchInput] = useState(props.container.ImageName.split(':')[0]);
    const [isImageInputActive, setImageInputActive] = useState(true);
    const [isVersionInputActive, setVersionInputActive] = useState(!!props.container.ImageName.split(':')[0]);
    const [isTagInputActive, setTagInputActive] = useState(!!props.container.ImageName.split(':')[1]);
    const {
        usePopulateImageQuery,
        usePopulateVersionQuery,
        usePopulateTagQuery
    } = apiSlice;
    const populateImageQuery = usePopulateImageQuery();
    const populateVersionQuery = usePopulateVersionQuery({image: chosenImage});
    const populateTagQuery = usePopulateTagQuery({image: chosenImage, version: chosenVersion});


    const nextStepIsDisabled = () => {
        return chosenImage === '' || chosenVersion === '' || chosenTags === '';
    };

    useEffect(() => {
        props.setDisableNext(nextStepIsDisabled());
    }, [chosenImage, chosenVersion, chosenTags]);

    useEffect(() => {
        const {
            data: populatedImage,
            error: imageError,
            isLoading: imageLoading,
        } = populateImageQuery;
        setFullImageList(populatedImage?.Images ?? []);
    }, [populateImageQuery]);

    useEffect(() => {
        const {
            data: populatedVersion,
            error: versionError,
            isLoading: versionLoading
        } = populateVersionQuery;
        setVersionList(populatedVersion?.Versions ?? []);
    }, [populateVersionQuery]);

    useEffect(() => {
        const {
            data: populatedTag,
            error: tagError,
            isLoading: tagLoading
        } = populateTagQuery;
        const tags: Array<string> = [];
        populatedTag?.forEach((tag: TagsFromImageVersionDTO) => {
            tags.push(tag.Name);
        });
        setTagList(tags);
    }, [populateTagQuery]);

    useEffect(() => {
        props.setContainer((prev: DockerContainer) => {
            return {
                ...prev,
                ImageName: chosenImage + ':' + chosenVersion,
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
            setChosenVersion(version);
            setTagInputActive(true);
            setVersionInputActive(false);
        } else {
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
        } else if (step === 2) {
            setVersionInputActive(true);
            setTagInputActive(false);
            setChosenTags('');
        }
    }

    interface ImageCardType {
        image: string;
    }


    const ImageCard = (image: ImageCardType) => {
        return (
            <Card sx={{backgroundColor: "#F0F0F0", margin: "0 0.5rem"}}>
                <CardContent>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <ContainerImage imageName={image.image}/>
                        <Typography variant="h6" component="div" style={{overflowWrap: "anywhere"}}>
                            {image.image}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{margin: "0.5rem 1rem"}}
                        onClick={() => handleChooseImage(image.image)}
                    >
                        Choisir
                    </Button>
                </CardActions>
            </Card>
        );
    };

    return (
        <form style={{display: "flex", flexDirection: "column", padding: '1rem'}}>
            <InputTextForm
                variant="filled"
                label="Rechercher un type d'image"
                value={imageSearchInput}
                onChange={handleImageFilterInput}
                disabled={!isImageInputActive}
                error={imageTypeUIValidator(chosenImage)}/>
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
                color={acquireValidationColor(VersionValidator(chosenVersion)())}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{margin: '1rem 0'}}
                        label="Choisissez une version"
                        variant="filled"
                        helperText={<Typography sx={{color: "#6563ff"}}>
                            {acquireHelperText(VersionValidator(chosenVersion)())}
                        </Typography>}
                        error={handleError(VersionValidator(chosenVersion)())}
                        focused={handleFocus(VersionValidator(chosenVersion)())}
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
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color="secondary" variant='contained' onClick={() => handlePreviousStep(1)}
                            sx={{margin: '0.5rem 1rem'}}>Précédent</Button>
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
                        sx={{margin: '0 0 1rem 0'}}
                        label="Choisissez vos tags"
                        variant="filled"
                        helperText={acquireHelperText(tagsUIValidator(chosenVersion))}
                        error={handleError(tagsUIValidator(chosenVersion))}
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
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color="secondary" variant='contained' onClick={() => handlePreviousStep(2)}
                            sx={{margin: '0.5rem 1rem'}}>Précédent</Button>
                </Box>
            }
        </form>
    );
}