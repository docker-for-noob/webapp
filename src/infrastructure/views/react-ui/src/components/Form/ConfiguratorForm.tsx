import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Button,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  InputImageEnvVariables,
  InputImagePorts,
  InputImageVolumes,
} from "../FormInput/ImageInput";
import { Previzualizer } from "../Previzualizer";
import { ServiceReference } from "@core/domain/serviceReference/models/service/service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  const handleChange =
    (step: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setStep((old) => (newExpanded ? step : old));
    };

  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <Button variant="contained" onClick={props.handleAddService}>
          Create Service
        </Button>
        {services.map((service) => (
          <Accordion key={service.key}>
            <AccordionSummary sx={{ backgroundColor: "#F0F0F0" }}>
              <Typography>{service.name}</Typography>
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
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      <Grid item xs={5}>
        <Previzualizer services={services} />
      </Grid>
    </Grid>
  );
}
