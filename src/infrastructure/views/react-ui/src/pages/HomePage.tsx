import React from 'react';
import { Button, Container, Typography } from '@mui/material';
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
    <Container>
      {form.content}
    </Container>
  );
}
