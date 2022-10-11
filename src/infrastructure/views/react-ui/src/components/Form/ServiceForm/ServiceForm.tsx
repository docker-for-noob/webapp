import {
  FormControlLabel,
  Switch,
  Box,
  Button,
  Typography,
  Grid,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mockHelpers } from "../../../mock/HelperMock";
import { HelperData, Helper } from "../../Helper";
import { Previzualizer } from "../../Previzualizer";
import { DockerCompose, DockerContainer } from '@core/domain/dockerCompose/models/DockerImage';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ServiceFormStep1 } from "./ServiceFormStep1";
import { ServiceFormStep2 } from "./ServiceFormStep2";
import { ServiceFormStep3 } from "./ServiceFormStep3";

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

interface ServiceFormProps {
  handleFinish: () => void;
  dockerCompose: DockerCompose;
  addContainer: (container: DockerContainer) => void;
}

export function ServiceForm(props: ServiceFormProps) {
  const helpers = mockHelpers;

  const [activeStep, setActiveStep] = useState(0);
  const [substep, setSubstep] = useState(0);

  const [disableNext, setDisableNext] = useState(false);
  const [isFilePreviewEnabled, setFilePreviewEnabled] = useState(false);

  const [currentHelper, setCurrentHelper] = useState<HelperData>(helpers[0]);
  const [container, setContainer] = useState<DockerContainer>({
    ServiceName: "",
    ImageName: "",
    Tag: "",
  });

  const steps = [
    "Créer un nouveau service",
    "Sélectionner une image",
    "Configurer l'image",
  ];

  window.addEventListener('keydown', (evt) => {
    if(evt.code == 'Enter') {
      evt.preventDefault();
      if(!disableNext){
        handleNext();
      }
    } else if (evt.code == 'Backspace') {
      evt.preventDefault();
      if (!disablePrev()) {
        handleBack();
      }
    }
  });

  const handleNext = () => {
    if (activeStep + 1 > 2) {
      props.addContainer(container);
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
        return <ServiceFormStep1
          setDisableNext={setDisableNext}
          setContainer={setContainer}
          container={container}
        />;
      case 1:
        return <ServiceFormStep2
          setDisableNext={setDisableNext}
          setContainer={setContainer}
          container={container}
        />;
      case 2:
        return (
          <ServiceFormStep3
            setDisableNext={setDisableNext}
            setSubstep={setSubstep}
            setContainer={setContainer}
            container={container}
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
      <Box sx={{marginBottom:4}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Box sx={{paddingX:2,height:'70px'}}>
            <Typography variant="h1">{steps[activeStep]}</Typography>
          </Box>
          <Box  sx={{paddingX:2}}>
            {renderStep(activeStep)}
          </Box>
          <Box sx={{paddingX:2,display:'flex',gap:1,marginTop:1}}>

            {activeStep !== 0 && 
              <Button variant='contained' startIcon={<ArrowBackIosNewIcon />} onClick={handleBack}>Précédent</Button>
            }
            <Button variant='contained'endIcon={<ArrowForwardIosIcon />} onClick={handleNext} disabled={disableNext}>Suivant</Button>
          </Box>
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
            <Previzualizer dockerCompose={{...props.dockerCompose, Container: [...props.dockerCompose.Container, container]}} />
          ) : (
            <Helper {...currentHelper} />
          )}
        </Grid>
      </Grid>
    </ Box>
  );
}
