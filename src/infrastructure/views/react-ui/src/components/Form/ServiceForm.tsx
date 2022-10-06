import {
  Card,
  CardContent,
  CardActions,
  FormControlLabel,
  Switch,
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
  Step,
  StepButton,
  Stepper,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { mockImages } from "../../mock/ServiceFormMock";
import { mockHelpers } from "../../mock/HelperMock";
import { InputImagePorts, InputImageVolumes, InputImageEnvVariables } from "../FormInput/ImageInput";
import { HelperData, Helper } from "../Helper";
import { Previzualizer } from "../Previzualizer";
import { InputTextForm } from "../FormInput/BaseInput";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  machineRoute: string;
  dockerRoute: string;
}

export interface EnvType {
  key: string;
  value: string;
}

interface ServiceFormStepProps {
  setDisableNext: (disable: boolean) => void;
}

interface ServiceFormStep3Props {
  setDisableNext: (disabled: boolean) => void;
  setSubstep: (substep: number) => void;
}

export function ServiceFormStep1(props: ServiceFormStepProps) {
  const [serviceName, setServiceName] = useState("");
  const [alias, setAlias] = useState("");

  const [hasAlias, setHasAlias] = useState(false);

  const nextStepIsDisabled = () => {
    return !serviceName || (hasAlias && !alias);
  };

  useEffect(() => {
    props.setDisableNext(nextStepIsDisabled());
  }, [serviceName, alias, hasAlias]);

  const handleServiceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  };

  const handleAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  };

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setHasAlias(event.target.checked);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column"}}>
      <InputTextForm
        label="Nom du service"
        variant="filled"
        value={serviceName}
        onChange={handleServiceNameChange}
      />

      <FormControlLabel
        control={<Switch checked={hasAlias} onChange={handleSwitch} />}
        label="Ajouter un alias"
      />

      {hasAlias && (
        <InputTextForm
          variant="filled"
          label="Alias"
          value={alias}
          onChange={handleAliasChange}
        />
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
    <form style={{ display: "flex", flexDirection: "column" }}>
      <InputTextForm variant="filled" label="Rechercher un type d'image" value={imageSearchInput} onChange={handleImageFilterInput} disabled={!isImageInputActive}/>
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

export function ServiceFormStep3(props: ServiceFormStep3Props) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    props.setSubstep(step);
  }, [step]);

  const accordionDetails = [
    {
      title: "Ports",
      fullTitle : "Choix des ports",
      content: <InputImagePorts setDisableNext={props.setDisableNext} />,
      step: 1,
    },
    {
      title: `Volumes`,
      fullTitle : "Choix des volumes",
      content: <InputImageVolumes setDisableNext={props.setDisableNext} />,
      step: 2,
    },
    {
      title: `Variables d'environnements`,
      fullTitle : "Choix des variables d'environnements",
      content: <InputImageEnvVariables setDisableNext={props.setDisableNext} />,
      step: 3,
    },
  ];

  const handleChange =
    (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setStep((old) => (newExpanded ? step : old));
    };

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      {accordionDetails.map((accordionDetail) => (
        <Accordion
          key={accordionDetail.step}
          
          expanded={step == accordionDetail.step}
          onChange={handleChange(accordionDetail.step)}
          sx={{
            marginBottom:2,
            border:'none',  
            boxShadow:'none',


          }}
        >
          <AccordionSummary sx={{ backgroundColor: "#F0F0F0",paddingX:3} } expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h3">
             {step == accordionDetail.step ? accordionDetail.fullTitle  : accordionDetail.step+'. '+accordionDetail.title} 
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F0F0F0",
              paddingX:3,
              paddingY:1,
            }}
          >
            {accordionDetail.content}
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Button
                variant="contained"
                onClick={() => setStep(accordionDetail.step + 1)}
                sx={{marginY:1}}
              >
                Étape suivante
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </form>
  );
}

interface ServiceFormProps {
  handleFinish: () => void;
}

export function ServiceForm(props: ServiceFormProps) {
  const helpers = mockHelpers;
  const [activeStep, setActiveStep] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [substep, setSubstep] = useState(0);
  const [currentHelper, setCurrentHelper] = useState<HelperData>(helpers[0]);
  const [isFilePreviewEnabled, setFilePreviewEnabled] = useState(false);

  const steps = [
    "Créer un nouveau service",
    "Sélectionner une image",
    "Configurer l'image",
  ];

  const handleNext = () => {
    if (activeStep + 1 > 2) {
      props.handleFinish();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const disablePrev = () => {
    return activeStep === 0;
  };

  const handleFilePreview = () => {
    setFilePreviewEnabled((old) => !old);
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ServiceFormStep1 setDisableNext={setDisableNext} />;
      case 1:
        return <ServiceFormStep2 setDisableNext={setDisableNext} />;
      case 2:
        return (
          <ServiceFormStep3
            setDisableNext={setDisableNext}
            setSubstep={setSubstep}
          />
        );
      default:
        return <div>Terminé</div>;
    }
  };

  useEffect(() => {
    const tmpSubstep = substep == 0 ? substep : substep - 1;
    setCurrentHelper(helpers[activeStep + tmpSubstep]);
  }, [activeStep, substep]);

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box sx={{paddingX:2}}>
            {renderStep(activeStep)}
          </Box>
          {activeStep !== 0 && (
            <Button variant="contained" onClick={handleBack}>
              Précédent
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={disableNext}
          >
            Suivant
          </Button>
        </Grid>
        <Grid item xs={5}>
          <FormControlLabel
            control={
              <Switch
                onChange={handleFilePreview}
                checked={isFilePreviewEnabled}
              />
            }
            label="Prévisualiser le fichier"
          />
          {isFilePreviewEnabled ? (
            <Previzualizer services={[]} />
            ) : (
            <Helper {...currentHelper} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
