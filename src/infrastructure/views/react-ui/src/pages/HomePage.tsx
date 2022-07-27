import React, {useRef, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Button, Container, StepButton, Grid, Switch, FormControlLabel, Paper } from '@mui/material';
import { ServiceFormStep1, ServiceFormStep2, ServiceFormStep3 } from '../components';
import { ImageType, VolumeType, EnvType } from '../components/Form/ServiceForm';
import { Helper, HelperData } from '../components/Helper';
import { mockHelpers } from 'src/mock/HelperMock';

interface ServiceFormData {
  name: string;
  alias?: string;
  language: string;
  image: ImageType;
  version: string;
  internalPort: number;
  externalPort: number;
  volumes: VolumeType[];
  environments: EnvType[];
}

const steps = [
  'Créer un nouveau service',
  'Sélectionner une image',
  "Configurer l'image",
];

export function HomePage() {

  const helpers = mockHelpers;
  const [activeStep, setActiveStep] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [substep, setSubstep] = useState(0);
  const [currentHelper, setCurrentHelper] = useState<HelperData>(helpers[0]);
  const [isFilePreviewEnabled, setFilePreviewEnabled] = useState(false);

  const [serviceFormData, setServiceFormData] = useState<ServiceFormData>({
    name: '',
    language: '',
    image: {
      id: 0,
      name: '',
      version: '',
      isUtils: false
    },
    version: '',
    internalPort: 0,
    externalPort: 0,
    volumes: [],
    environments: [],
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const disablePrev = () => {
    return activeStep === 0;
  }

  const handleFilePreview = () => {
    setFilePreviewEnabled((old) => (!old));
  }

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ServiceFormStep1 setDisableNext={setDisableNext} />;
      case 1:
        return <ServiceFormStep2 setDisableNext={setDisableNext} />;
      case 2:
        return <ServiceFormStep3 setDisableNext={setDisableNext} setSubstep={setSubstep} />;
      default:
        return <div>Terminé</div>;
    }
  }

  useEffect(() => {
    const tmpSubstep = (substep == 0) ? substep : substep - 1;
    setCurrentHelper(helpers[activeStep + tmpSubstep]);
  }, [activeStep, substep]);
    
  
  return (
    <Container maxWidth="xl">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      
      <Grid container spacing={4}>
        <Grid item xs={7}>
          {renderStep(activeStep)}
          {activeStep !== 0 && 
            <Button variant='contained' onClick={handleBack}>Précédent</Button>
          }
          <Button variant='contained' onClick={handleNext} disabled={disableNext}>Suivant</Button>
        </Grid>
        <Grid item xs={5}>
          <FormControlLabel control={<Switch onChange={handleFilePreview} checked={isFilePreviewEnabled}/>} label="Prévisualiser le fichier" />
          {isFilePreviewEnabled 
          ? 
          <Paper>
            Lorem Ipsum
          </Paper> 
          : 
          <Helper {...currentHelper} /> 
          }
          
        </Grid>
      </Grid>
    </Container>
  );
}
