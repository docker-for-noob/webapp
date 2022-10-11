import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  InputImageEnvVariables,
  InputImagePorts,
  InputImageVolumes,
} from "../FormInput/ImageInput";
import { Previzualizer } from "../Previzualizer";
import { ServiceReference } from "@core/domain/serviceReference/models/service";
import { DockerCompose, port, volumes, env } from '@core/domain/dockerCompose/models/DockerImage';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfiguratorFormProps {
  handleAddService: () => void;
  dockerCompose: DockerCompose;
  setDockerCompose: Dispatch<SetStateAction<DockerCompose>>;
}

export function ConfiguratorForm(props: ConfiguratorFormProps) {
  const [step, setStep] = useState(1);
  const [rerender, setRerender] = useState(0);

  const handlePortChange = (index: number, port: port) => {
    const newDockerCompose = { ...props.dockerCompose };
    newDockerCompose.Container[index].Ports = [port];
    props.setDockerCompose(newDockerCompose);
    setRerender(rerender + 1);
  }

  const handleAddVolume = (index: number, volume: volumes) => {
    const newDockerCompose = { ...props.dockerCompose };
    if (newDockerCompose.Container[index].Volumes !== undefined) {
      newDockerCompose.Container[index].Volumes?.push(volume);
    } else {
      newDockerCompose.Container[index].Volumes = [volume];
    }
    props.setDockerCompose(newDockerCompose);
  }

  const handleAddEnvVariables = (index: number, env: env) => {
    const newDockerCompose = { ...props.dockerCompose };
    if (newDockerCompose.Container[index].Volumes !== undefined) {
      newDockerCompose.Container[index].Env?.push(env);
    } else {
      newDockerCompose.Container[index].Env = [env];
    }
    props.setDockerCompose(newDockerCompose);
  }

  const accordionDetails = (indexContainer: number) => [
    {
      key: 1,
      title: "Ports",
      content: <InputImagePorts
        setDisableNext={() => { }}
        handlePortsChange={(ports) => handlePortChange(indexContainer, ports)}
        defaultPorts={props.dockerCompose.Container[indexContainer].Ports![0]}
      />,
      step: 1,
    },
    {
      key: 2,
      title: `Volumes`,
      content: <InputImageVolumes
        setDisableNext={() => { }}
        handleAddVolume={(volume) => handleAddVolume(indexContainer, volume)}
      />,
      step: 2,
    },
    {
      key: 3,
      title: `Variables d'environnement`,
      content: <InputImageEnvVariables
        setDisableNext={() => { }}
        handleAddEnvVariable={(env) => handleAddEnvVariables(indexContainer, env)}
      />,
      step: 3,
    },
  ];

  const TooltipTextH1 = () => {
    return `Configure ton application Docker grâce à l'interface`;
  }

  const handleChange =
    (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setStep((old) => (newExpanded ? step : old));
    };

  const handleDeleteService = (key:number) => {
    let newDockerCompose = props.dockerCompose
    newDockerCompose.Container = newDockerCompose.Container.filter((service,keyService)=> keyService !== key)
    props.setDockerCompose(newDockerCompose);
    setRerender(rerender + 1);
  }
  

  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <Box sx={{marginBottom:2,display:'flex',gap:1,alignItems:'start'}}>
          <Typography variant="h1">Configurateur</Typography>
          <Tooltip placement="right" title={TooltipTextH1()}>
            <IconButton aria-label="help" size="small">
              <HelpIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
        </Box>
        
        {props.dockerCompose.Container.map((service, index) => (
          <Accordion key={index}
          sx={{
            marginBottom:2,
            border:'none',  
            boxShadow:'none'}}>
            <AccordionSummary sx={{ backgroundColor: "#F0F0F0" }}  expandIcon={<EditIcon/>}>

              <Box sx={{display:'flex', gap : 2}}>
                <Box>
                 <img src='https://via.placeholder.com/60' alt={`logo de ${service.ServiceName}`} />
                </Box>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <Box>
                      <Typography variant="h3" sx={{fontSize:'17px'}}>{service.ServiceName}</Typography>
                      <Typography variant="body1"  sx={{fontStyle:'italic'}}>{service.Ports ? service.Ports[0].container+':'+service.Ports[0].host : 'Aucun port'}</Typography>
                    </Box>
                </Box>

              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#F0F0F0" }}>
              {accordionDetails(index).map((accordionDetail) => (
                <form
                  key={accordionDetail.step}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Accordion
                    sx={{ boxShadow: "none" }}
                    expanded={step == accordionDetail.step}
                    onChange={handleChange(accordionDetail.step)}
                  >
                    <AccordionSummary
                      sx={{ backgroundColor: "#F0F0F0" }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>
                        {accordionDetail.step}. {accordionDetail.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 1rem",
                        backgroundColor: "#F0F0F0",
                      }}
                    >
                      {accordionDetail.content}
                    </AccordionDetails>
                  
                  </Accordion>
                </form>
              ))}
            <Box sx={{marginTop:2,display:'flex',justifyContent:'center'}}>
              <Button onClick={()=>{handleDeleteService(index)}} startIcon={<DeleteIcon />} variant="contained">Supprimer</Button>
            </Box>

            </AccordionDetails>
           
          </Accordion>
        ))}

          <Box sx={{marginTop:2}}>
            <Button variant="contained" startIcon={<AddIcon />}onClick={props.handleAddService}>
              Ajouter un service
            </Button>
          </Box>
      </Grid>
      <Grid item xs={5}>
        <Previzualizer dockerCompose={props.dockerCompose} rerender={rerender}/>
      </Grid>
    </Grid>
  );
}
