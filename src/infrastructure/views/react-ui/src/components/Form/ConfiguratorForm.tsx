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
import React, { useEffect, useState } from "react";
import {
  InputImageEnvVariables,
  InputImagePorts,
  InputImageVolumes,
} from "../FormInput/ImageInput";
import { Previzualizer } from "../Previzualizer";
import { ServiceReference } from "@core/domain/serviceReference/models/service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfiguratorFormProps {
  handleAddService: () => void;
}

export function ConfiguratorForm(props: ConfiguratorFormProps) {
  const [step, setStep] = useState(1);

  const services: ServiceReference[] = [
    {
      key: 1,
      name: "Golang",
      alias: "go",
      image: {
        id: "go",
        name: "go",
        type: "APP",
        port: [8080, 5050],
        env: [
          {
            key: "GOPATH",
            description: "desc",
          }
        ],
      },
    },
    {
      key: 2,
      name: "Service 2",
      alias: "service-2",
      image: {
        id: "image-2",
        name: "image-2",
        type: "APP",
        port: [8080, 5050],
        env: [
          {
            key: "value",
            description: "description",
          },
        ],
      },
    },
  ];

  const accordionDetails = [
    {
      key: 1,
      title: "Ports",
      content: <InputImagePorts setDisableNext={() => {}} />,
      step: 1,
    },
    {
      key: 2,
      title: `Volumes`,
      content: <InputImageVolumes setDisableNext={() => {}} />,
      step: 2,
    },
    {
      key: 3,
      title: `Variables d'environnement`,
      content: <InputImageEnvVariables setDisableNext={() => {}} />,
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
    console.log('handleDeleteService',key)
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
        
        {services.map((service) => (
          <Accordion key={service.key}  
          sx={{
            marginBottom:2,
            border:'none',  
            boxShadow:'none'}}>
            <AccordionSummary sx={{ backgroundColor: "#F0F0F0" }}  expandIcon={<EditIcon/>}>

              <Box sx={{display:'flex', gap : 2}}>
                <Box>
                 <img src='https://via.placeholder.com/60' alt={`logo de ${service.name}`} />
                </Box>
                <Box sx={{display:'flex',alignItems:'center'}}>
                    <Box>
                      <Typography variant="h3" sx={{fontSize:'17px'}}>{service.name}</Typography>
                      <Typography variant="body1"  sx={{fontStyle:'italic'}}>{service.image.port?.join(':')}</Typography>
                    </Box>
                </Box>

              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#F0F0F0" }}>
              {accordionDetails.map((accordionDetail) => (
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
              <Button onClick={()=>{handleDeleteService(service.key)}} startIcon={<DeleteIcon />} variant="contained">Supprimer</Button>
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
        <Previzualizer services={services} />
      </Grid>
    </Grid>
  );
}
