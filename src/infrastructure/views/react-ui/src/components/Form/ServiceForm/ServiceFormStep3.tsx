import { DockerContainer, port, volumes, env } from "@core/domain/dockerCompose/models/DockerImage";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Button } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { InputImagePorts, InputImageVolumes, InputImageEnvVariables } from "../../FormInput/ImageInput";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ServiceFormStep3Props {
    setDisableNext: (disabled: boolean) => void;
    setSubstep: (substep: number) => void;
    container: DockerContainer;
    setContainer: Dispatch<SetStateAction<DockerContainer>>
  }
  
  export function ServiceFormStep3(props: ServiceFormStep3Props) {
    const [step, setStep] = useState(1);
  
    useEffect(() => {
      props.setSubstep(step);
    }, [step]);
  
    const handleChange =
      (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setStep((old) => (newExpanded ? step : old));
      };
  
    useEffect(() => {
      props.setSubstep(step);
    }, [step]);
  
    const handleAddPort = (port: port) => {
      props.setContainer((prev: DockerContainer) => {
        return {
          ...prev,
          Ports: [port],
        }
      })
    }
  
    const handleAddVolume = (volume: volumes) => {
      props.setContainer((prev: DockerContainer) => {
        const volumes = prev.Volumes ?? [];
        return {
          ...prev,
          Volumes: [...volumes, volume],
        }
      })
    }
  
    const handleAddEnvVariable = (envVariable: env) => {
      props.setContainer((prev: DockerContainer) => {
        const envVariables = prev.Env ?? [];
        return {
          ...prev,
          Env: [...envVariables, envVariable],
        }
      })
    }
  
    const accordionDetails = [
      {
        title: "Ports",
        fullTitle: "Choix des ports",
        content: <InputImagePorts
          setDisableNext={props.setDisableNext}
          handlePortsChange={handleAddPort}
        />,
        step: 1,
      },
      {
        title: `Volumes`,
        fullTitle: "Choix des volumes",
        content: <InputImageVolumes
          setDisableNext={props.setDisableNext}
          handleAddVolume={handleAddVolume}
        />,
        step: 2,
      },
      {
        title: `Variables d'environnement`,
        fullTitle: "Choix des variables d'environnements",
        content: <InputImageEnvVariables
         setDisableNext={props.setDisableNext}
         handleAddEnvVariable={handleAddEnvVariable}
          />,
        step: 3,
      },
    ];
  
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