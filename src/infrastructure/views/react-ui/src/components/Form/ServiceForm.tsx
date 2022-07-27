import { Card, CardContent, CardActions, FormControlLabel, Radio, MenuItem, FormControl, FilledInput, InputLabel, Switch, SelectChangeEvent, Select, Autocomplete, TextField, Box, Checkbox, Button, FormGroup, Accordion, AccordionDetails, AccordionSummary, Typography, Grid, Input, List, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import React, { ComponentProps, useEffect, useState, SyntheticEvent, ChangeEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { mockImages } from "../../mock/ServiceFormMock";
import { InputTextForm } from "./InputForm";

export interface ImageType {
    id: number,
    name: string,
    version: string,
    isUtils: boolean
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

  const languages = [
    {
      value: "en",
      label: "English"
    },
    {
      value: "fr",
      label: "French"
    }
  ];

  const [serviceName, setServiceName] = useState("");
  const [language, setLanguage] = useState("en");
  const [alias, setAlias] = useState("");

  const [hasAlias, setHasAlias] = useState(false);

  const nextStepIsDisabled = () => {
    return !serviceName || !language || (hasAlias && !alias);
  }

  useEffect(() => {
    props.setDisableNext(nextStepIsDisabled());
    console.log(nextStepIsDisabled());
  }, [serviceName, language, alias, hasAlias]);

  const handleServiceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  }

  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  }

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setHasAlias(event.target.checked);
  };

  return (
    <form style={{display: "flex", flexDirection: "column", padding: '1rem'}}>
      <InputTextForm label="Service Name" variant="filled" value={serviceName} onChange={handleServiceNameChange} />

      <FormControlLabel control={
      <Switch
       checked={hasAlias} onChange={handleSwitch} />
      }
       label="Add Alias"
      />

      {hasAlias && (
        <InputTextForm variant="filled" label="Alias" value={alias} onChange={handleAliasChange} />
      )}

      {/*<FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="language-select">Language</InputLabel>
        <Select
          id="language-select"
          label="Language"
          onChange={handleLanguage}
          value={language}
        >
          {languages.map((language) => (
            <MenuItem key={language.value} value={language.value}>
              {language.label}
            </MenuItem>
          ))}
          </Select>
      </FormControl>*/}
    </form>
  );
}

export function ServiceFormStep2(props: ServiceFormStepProps) {

  const defaultImage = {
    id: 0,
    name: "",
    version: "",
    isUtils: false,
  };

  const [chosenImage, setChosenImage] = useState<ImageType>(defaultImage);
  const [imageList, setImageList] = useState<Array<ImageType>>([]);
  const [isDockerhubSearch, setDockerhubSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const chooseImage = (image: ImageType) => {
      setChosenImage(image);
      setSearchInput(image.name + ' ' + image.version);
      setImageList([]);
  };

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setDockerhubSearch(event.target.checked);
    setImageList([]);
    setSearchInput('');
  };

  const handleImageFilterInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    const listToFilter = isDockerhubSearch ? [] : mockImages;
    if(event.target.value != '') {
      setImageList(
        listToFilter.filter((image) =>
          (image.name + ' ' + image.version).toLowerCase().startsWith(event.target.value.toLowerCase())
        ).slice(0,9)
      );
    } else {
      setImageList([]);
    }
  };

  const ImageCard = (image: ImageType) => {
    return (
      <Card sx={{ backgroundColor: "#F0F0F0", margin: "0 0.5rem" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {image.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {image.version}
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
      <FormControlLabel
        control={<Switch checked={isDockerhubSearch} onChange={handleSwitch} />}
        label="Search on Docker Hub"
      />
      <InputTextForm variant="filled" label="Search for an image" value={searchInput} onChange={handleImageFilterInput} />
      <Grid container spacing={2}>
        {imageList.map((image) => (
          <Grid item xs={4} key={image.id}>
            <ImageCard {...image} />
          </Grid>
        ))}
      </Grid>
    </form>
  );
} 

const AccordionDetailsVersion = (props: ServiceFormStepProps) => {

  const [version, setVersion] = useState("");

  const nextStepIsDisabled = () => {
    return !version;
  }

  useEffect(() => {
    props.setDisableNext(nextStepIsDisabled());
  }, [version]);

  const handleImageVersionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVersion(event.target.value);
  }
  
  return (
    <InputTextForm label="Image version" value={version} onChange={handleImageVersionChange} key="editor1" />
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
      <InputTextForm label="Route on your machine" value={machineRoute} onChange={handleMachineRouteChange} />
      <InputTextForm label="Route on the Docker container" value={dockerRoute} onChange={handleDockerRouteChange} />
      <Button variant='contained' onClick={handleVolumesChange} sx={{ margin: '0.5rem 1rem' }}>Add</Button>
      <Table sx={{ margin: '1rem 0' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '4rem'}}></TableCell>
            <TableCell>Machine route</TableCell>
            <TableCell>Docker route</TableCell>
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
      <InputTextForm label="Key" value={key} onChange={handleKeyChange} />
      <InputTextForm label="Value" value={value} onChange={handleValueChange} />
      <Button variant='contained' onChange={handleEnvChange} size="medium" sx={{ margin: '0.5rem 1rem' }}>Add</Button>
      <Table sx={{ margin: '1rem 0' }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
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
      <InputTextForm label="Internal port" type="number" value={internalPort} onChange={handleInternalPortChange} />
      <InputTextForm label="External port" type="number" value={externalPort} onChange={handleExternalPortChange} />
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
      title: "Tag",
      content: <AccordionDetailsVersion
      setDisableNext={props.setDisableNext} />,
      step: 2,
    },
    {
      title: `Volumes`,
      content: <AccordionDetailsVolumes 
      setDisableNext={props.setDisableNext} />,
      step: 3,
    },
    {
      title: `Environnement variables`,
      content: <AccordionDetailsEnvVariables  
      setDisableNext={props.setDisableNext} />,
      step: 4,
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
              <Button color="secondary" variant='contained' onClick={() => setStep(accordionDetail.step+1)} sx={{ margin: '0.5rem 1rem' }}>Next Step</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </form>
  );
}