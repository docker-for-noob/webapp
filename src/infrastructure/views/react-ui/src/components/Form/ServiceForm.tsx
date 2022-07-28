import { Card, CardContent, CardActions, FormControlLabel, Radio, MenuItem, FormControl, FilledInput, InputLabel, Switch, SelectChangeEvent, Select, Autocomplete, TextField, Box, Checkbox, Button, FormGroup, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Input, List, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import React, { ComponentProps, useEffect, useState, SyntheticEvent, ChangeEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { mockImages } from "../../mock/ServiceFormMock";
import { InputTextForm } from "./InputForm";
import { versions } from "process";
import { version } from "os";

export interface ImageType {
    id: number,
    name: string,
    versions: Array<VersionType>,
    isUtils: boolean
}

export interface VersionType {
  version: string,
  tags: Array<string>
}

export interface VolumeType {
  machineRoute: string,
  dockerRoute: string
}

export interface EnvType {
  key: string,
  value: string
}

interface ServiceFormStepProps {
  setDisableNext: (disable: boolean) => void
}

interface Step3Props {
  setDisableNext: (disabled: boolean) => void,
  setSubstep: (substep: number) => void
}

export function ServiceFormStep1(props: ServiceFormStepProps) {

  const [serviceName, setServiceName] = useState("");
  const [alias, setAlias] = useState("");

  const [hasAlias, setHasAlias] = useState(false);

  const nextStepIsDisabled = () => {
    return !serviceName || (hasAlias && !alias);
  }

  useEffect(() => {
    props.setDisableNext(nextStepIsDisabled());
  }, [serviceName, alias, hasAlias]);

  const handleServiceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  }

  const handleAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  }

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setHasAlias(event.target.checked);
  };

  return (
    <form style={{display: "flex", flexDirection: "column", padding: '1rem'}}>
      <InputTextForm label="Nom du service" variant="filled" value={serviceName} onChange={handleServiceNameChange} />

      <FormControlLabel control={
      <Switch
       checked={hasAlias} onChange={handleSwitch} />
      }
       label="Ajouter un alias"
      />

      {hasAlias && (
        <InputTextForm variant="filled" label="Alias" value={alias} onChange={handleAliasChange} />
      )}
    </form>
  );
}

export function ServiceFormStep2(props: ServiceFormStepProps) {

  const defaultImage = {
    id: 0,
    name: "",
    versions: [],
    isUtils: false,
  };
  
  const defaultVersion = {version: '', tags: []};

  const [chosenImage, setChosenImage] = useState<ImageType>(defaultImage);
  const [chosenVersion, setChosenVersion] = useState<VersionType>(defaultVersion);
  const [chosenTag, setChosenTag] = useState("");
  const [imageList, setImageList] = useState<Array<ImageType>>([]);
  const [versionList, setVersionList] = useState<Array<VersionType>>([]);
  const [tagList, setTagList] = useState<Array<string>>([]);
  const [imageSearchInput, setImageSearchInput] = useState("");
  const [versionSearchInput, setVersionSearchInput] = useState("");
  const [tagSearchInput, setTagSearchInput] = useState("");
  const [isImageInputActive, setImageInputActive] = useState(true);
  const [isVersionInputActive, setVersionInputActive] = useState(false);
  const [isTagInputActive, setTagInputActive] = useState(false);


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
    if(version !== null && version.version !== "") {
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

  const handleChangeTag = (tag: string | null) => {
    if(tag !== null && tag !== "") {
      setTagSearchInput(tag);
      setChosenTag(tag);
    }
  }

  const handleImageFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
    setImageSearchInput(event.target.value);
    const listToFilter = mockImages;
    if(event.target.value != '') {
      setImageList(
        listToFilter.filter((image) =>
          (image.name).toLowerCase().startsWith(event.target.value.toLowerCase())
        ).slice(0,9)
      );
    } else {
      setImageList([]);
    }
  };

  const handleNextStep = (step: number) => {
    if(step === 1) {
      setImageInputActive(false);
      setVersionInputActive(true);
    } else if(step === 2) {
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
      setChosenTag("");
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
            sx={{ margin: '0.5rem 1rem' }}
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
      <InputTextForm variant="filled" label="Rechercher un type d'image" value={imageSearchInput} onChange={handleImageFilterInput} disabled={!isImageInputActive}/>
      <Grid container spacing={2}>
        {imageList.map((image) => (
          <Grid item xs={4} key={image.id}>
            <ImageCard {...image} />
          </Grid>
        ))}
      </Grid>
      <Autocomplete
        id="version-select"
        options={versionList}
        autoHighlight
        getOptionLabel={(option) => option.version}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.version}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choisissez une version"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        value={chosenVersion}
        onChange={(event: any, newValue: VersionType | null) => {
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
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choisissez vos tags"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        value={chosenTag}
        onChange={(event: any, newValue: string | null) => {
          handleChangeTag(newValue);
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

const AccordionDetailsVolumes = (props: ServiceFormStepProps) => {

  const [volumesList, setVolumesList] = useState<Array<VolumeType>>([]);

  const [machineRoute, setMachineRoute] = useState("");
  const [dockerRoute, setDockerRoute] = useState("");

  const handleMachineRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMachineRoute(event.target.value);
  }

  const handleDockerRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDockerRoute(event.target.value);
  }

  const handleVolumesChange = () => {
    setVolumesList([...volumesList, { machineRoute, dockerRoute }]);
  }

  const handleVolumesDelete = (index: number) => {
    setVolumesList(volumesList.filter((_, i) => i !== index));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <InputTextForm label="Chemin sur votre machine" value={machineRoute} onChange={handleMachineRouteChange} />
      <InputTextForm label="Chemin dans le container" value={dockerRoute} onChange={handleDockerRouteChange} />
      <Button variant='contained' onClick={handleVolumesChange} sx={{ margin: '0.5rem 1rem' }}>Ajouter</Button>
      <Table sx={{ margin: '1rem 0' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '4rem'}}></TableCell>
            <TableCell>Chemin local</TableCell>
            <TableCell>Chemin container</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volumesList.map((volume, index) => (
            <TableRow key={volume.machineRoute}>
              <IconButton onClick={() => handleVolumesDelete(index)} sx={{ margin: '0.5rem 1rem' }} component="label">
                <DeleteIcon />
              </IconButton>
              <TableCell>{volume.machineRoute}</TableCell>
              <TableCell>{volume.dockerRoute}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
} 

const AccordionDetailsEnvVariables = (props: ServiceFormStepProps) => {

  const [envList, setEnvList] = useState<Array<EnvType>>([]);

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  }

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleEnvChange = () => {
    setEnvList([...envList, { key, value }]);
  }

  const handleEnvDelete = (index: number) => {
    setEnvList(envList.filter((_, i) => i !== index));
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <InputTextForm label="Clé" value={key} onChange={handleKeyChange} />
      <InputTextForm label="Valeur" value={value} onChange={handleValueChange} />
      <Button variant='contained' onChange={handleEnvChange} size="medium" sx={{ margin: '0.5rem 1rem' }}>Ajouter</Button>
      <Table sx={{ margin: '1rem 0' }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Clé</TableCell>
            <TableCell>Valeur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {envList.map((env, index) => (
            <TableRow key={env.key}>
              <IconButton onClick={() => handleEnvDelete(index)} sx={{ margin: '0.5rem 1rem' }} component="label">
                <DeleteIcon />
              </IconButton>
              <TableCell>{env.key}</TableCell>
              <TableCell>{env.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
} 

const AccordionDetailsImage = (props: ServiceFormStepProps) => {

  const [internalPort, setInternalPort] = useState(0);
  const [externalPort, setExternalPort] = useState(0);
  
  const handleInternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInternalPort(parseInt(event.target.value));
  }

  const handleExternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExternalPort(parseInt(event.target.value));
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <InputTextForm label="Port interne" type="number" value={internalPort} onChange={handleInternalPortChange} />
      <InputTextForm label="Port externe" type="number" value={externalPort} onChange={handleExternalPortChange} />
    </Box>
  );
} 

export function ServiceFormStep3(props: Step3Props) {

  const [step, setStep] = useState(1);

  useEffect(() => {
    props.setSubstep(step);
  }, [step]);

  const accordionDetails = [
    {
      title: "Ports",
      content: <AccordionDetailsImage 
      setDisableNext={props.setDisableNext} />,
      step: 1,
    },
    {
      title: `Volumes`,
      content: <AccordionDetailsVolumes 
      setDisableNext={props.setDisableNext} />,
      step: 2,
    },
    {
      title: `Variables d'environnement`,
      content: <AccordionDetailsEnvVariables  
      setDisableNext={props.setDisableNext} />,
      step: 3,
    }
  ]

  const handleChange =
  (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setStep((old) => newExpanded ? step : old);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", padding: '1rem' }}>
      {accordionDetails.map((accordionDetail) => (
        <Accordion key={accordionDetail.step} expanded={step == accordionDetail.step} onChange={handleChange(accordionDetail.step)}>
          <AccordionSummary sx={{ backgroundColor: '#F0F0F0' }}>
            <Typography variant="h6">{accordionDetail.step}. {accordionDetail.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#F0F0F0',  padding: '0 1rem' }}>
            {accordionDetail.content}
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button color="secondary" variant='contained' onClick={() => setStep(accordionDetail.step+1)} sx={{ margin: '0.5rem 1rem' }}>Étape suivante</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </form>
  );
}