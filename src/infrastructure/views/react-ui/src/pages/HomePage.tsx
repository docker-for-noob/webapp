
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ServiceForm } from '../components/Form/ServiceForm';
import { ConfiguratorForm } from '../components/Form/ConfiguratorForm';

export function HomePage() {

  const forms = [
    {
      title: 'Configuration',
      content: <ConfiguratorForm
        handleAddService={() => changeForms(1)}
      />
    },
    {
      title: 'Service',
      content: <ServiceForm
        handleFinish={() => changeForms(0)}
      />
    }
  ];

  const [form, setForm] = React.useState(forms[0]);


  const changeForms = (index: number) => {
    setForm(forms[index]);
  }

  return (
    <ContainerCustom>
      {form.content}
    </ContainerCustom>
  );
}


type ContainerCustomProps = {
  children: JSX.Element
}

const ContainerCustom = ({ children }:  ContainerCustomProps) => (
  <Box sx={{maxWidth:'1480px',width:'90%', minHeight:'80vh', margin:'auto'}}>
      {children}
  </Box>
)

export default ContainerCustom;
