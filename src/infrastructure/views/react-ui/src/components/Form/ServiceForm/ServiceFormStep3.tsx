import { DockerContainer, port, volumes, env } from "@core/domain/dockerCompose/models/DockerImage";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, Button } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { InputImagePorts, InputImageVolumes, InputImageEnvVariables } from "../../FormInput/ImageInput";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apiSlice } from "../../../../../../redux/api/apiSlice";

interface ServiceFormStep3Props {
    setDisableNext: (disabled: boolean) => void;
    setSubstep: (substep: number) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>
    container: DockerContainer;
    dockerCompose : DockerCompose
  }
  
  export function ServiceFormStep3(props: ServiceFormStep3Props) {
    const [step, setStep] = useState(1);

    const [portsSuggestions, setPortsSuggestions] = useState<Array<port>>([]);
    const [volumesSuggestions, setVolumesSuggestions] = useState<Array<volumes>>([]);

    const {useFetchImageReferenceQuery} = apiSlice;
    const imageReferenceQuery = useFetchImageReferenceQuery({ image: props.container.ImageName });

    useEffect(() => {
      props.setSubstep(step);
    }, [step]);

    useEffect(() => {
      const {
        data: imageReferenceData,
        error: imageReferenceError,
        isLoading: imageReferenceLoading,
      } = imageReferenceQuery;
      imageReferenceData?.Workdir?.forEach((volume) => {
        handleAddVolume({host: volume, container: volume});
      });
      imageReferenceData?.Env?.forEach((env) => {
        //TODO: add env variable suggestion
      });
      imageReferenceData?.Port?.forEach((port) => {
        setPortsSuggestions((prev) => [...prev, {host: port, container: port}]);
      });
      setStep(1);
    }, [imageReferenceQuery]);

    const handleChange =
      (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setStep((old) => (newExpanded ? step : old));
      };
  

  
    const handleAddPort = (port: port) => {
        props.setContainer((prev: DockerContainer) => {
            const ports = prev.Ports ?? [];
            return {
                ...prev,
                Ports: [...ports, port],
            }
        })
    }

    const handleRemovePort = (index: number) => {
        props.setContainer((prev: DockerContainer) => {
            const ports = prev.Ports ? prev.Ports.filter((_, i) => i !== index) : [];
            return {
                ...prev,
                Ports: ports,
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

    const handleRemoveVolume = (index: number) => {
        props.setContainer((prev: DockerContainer) => {
            const volumes = prev.Volumes ? prev.Volumes.filter((_, i) => i !== index) : [];
            return {
                ...prev,
                Volumes: volumes,
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

    const handleRemoveEnvVariable = (index: number) => {
      props.setContainer((prev: DockerContainer) => {
        const envVariables = prev.Env ? prev.Env.filter((_, i) => i !== index) : [];
        return {
          ...prev,
          Env: envVariables,
        }
      })
    }

    const accordionDetails = [
      {
        title: "Ports",
        fullTitle: "Choix des ports",
        content: <InputImagePorts
          setDisableNext={props.setDisableNext}
          handleAddPort={handleAddPort}
          handleRemovePort={handleRemovePort}
          currentPorts={props.container.Ports ?? []}
          suggestions={portsSuggestions}
          setSuggestions={setPortsSuggestions}
          dockerCompose={props.dockerCompose}
        />,
        step: 1,
      },
      {
        title: `Volumes`,
        fullTitle: "Choix des volumes",
        content: <InputImageVolumes
          setDisableNext={props.setDisableNext}
          handleAddVolume={handleAddVolume}
          handleRemoveVolume={handleRemoveVolume}
          currentVolumes={props.container.Volumes ?? []}
          suggestions={volumesSuggestions}
          setSuggestions={setVolumesSuggestions}

        />,
        step: 2,
      },
      {
        title: `Variables d'environnement`,
        fullTitle: "Choix des variables d'environnements",
        content: <InputImageEnvVariables
         setDisableNext={props.setDisableNext}
         handleAddEnvVariable={handleAddEnvVariable}
         handleRemoveEnvVariable={handleRemoveEnvVariable}
         currentEnv={props.container.Env ?? []}
          />,
        step: 3,
      },
    ];

    return (
        <form style={{display: "flex", flexDirection: "column"}}>
            {accordionDetails.map((accordionDetail) => (
                <Accordion
                    key={accordionDetail.step}
                    expanded={step == accordionDetail.step}
                    onChange={handleChange(accordionDetail.step)}
                    sx={{
                        marginBottom: 2,
                        border: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <AccordionSummary sx={{backgroundColor: "#F0F0F0", paddingX: 3}} expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="h3">
                            {step == accordionDetail.step ? accordionDetail.fullTitle : accordionDetail.step + '. ' + accordionDetail.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#F0F0F0",
                            paddingX: 3,
                            paddingY: 1,
                        }}
                    >
                        {accordionDetail.content}
                        {
                            accordionDetail.step > 2 ||
                            <Box sx={{display: "flex", justifyContent: "start"}}>
                                <Button
                                    variant="contained"
                                    onClick={() => setStep(accordionDetail.step + 1)}
                                    sx={{marginY: 1}}
                                >
                                    Étape suivante
                                </Button>
                            </Box>
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </form>
    );
  }