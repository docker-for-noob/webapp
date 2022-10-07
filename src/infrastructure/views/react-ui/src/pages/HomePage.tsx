import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { ServiceForm } from '../components/Form/ServiceForm';
import { ConfiguratorForm } from '../components/Form/ConfiguratorForm';
import { DockerCompose, DockerContainer } from '@core/domain/dockerCompose/models/DockerImage';

export function HomePage() {

  const dockerComposeVersion = process.env.REACT_APP_DOCKER_COMPOSE_VERSION ?? '';
  const [dockerCompose, setDockerCompose] = React.useState<DockerCompose>(
    { 
    DockerComposeVersion: dockerComposeVersion, 
    Container: [] 
    });

  const changeForms = (index: number) => {
    setForm(forms[index]);
  }

  const changeDockerCompose = (dockerCompose: DockerCompose) => {
    setDockerCompose(dockerCompose);
  }

  const addDockerContainer = (dockerContainer: DockerContainer) => {
    if (dockerCompose !== undefined) {
      let dockerComposeCopy:DockerCompose = dockerCompose;
      dockerComposeCopy.Container.push(dockerContainer);
      setDockerCompose(dockerCompose);
    }
  }


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
        dockerCompose={dockerCompose}
        addContainer={addDockerContainer}
      />
    }
  ];

  const [form, setForm] = React.useState(forms[0]);

  return (
    <Container>
      {form.content}
    </Container>
  );
}
