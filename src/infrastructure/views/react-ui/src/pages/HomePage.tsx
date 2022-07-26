import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Container } from '@mui/material';
import { ServiceFormStep1, ServiceFormStep2, ServiceFormStep3 } from '../components';
import { ImageType, VolumeType, EnvType } from 'src/components/Form/ServiceForm';

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
  'Create new service',
  'Select image type',
  'Configure image',
];

export function HomePage() {

  const [activeStep, setActiveStep] = useState(0);

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

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <ServiceFormStep1 />;
      case 1:
        return <ServiceFormStep2 />;
      case 2:
        return <ServiceFormStep3 />;
      default:
        return <div>finish</div>;
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Container>
        {renderStep(activeStep)}
      </Container>

      <Button variant='contained' onClick={handleNext}>Next Step</Button>
    </Box>
  );
}
