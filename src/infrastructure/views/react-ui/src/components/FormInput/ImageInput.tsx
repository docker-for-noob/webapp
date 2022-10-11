import React, { ChangeEvent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { FormControl, InputLabel, Input, FilledInput, Box, Button, IconButton, Table, Typography, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { VolumeType, EnvType } from '../Form/ServiceForm/ServiceForm';
import { InputTextForm } from './BaseInput';
import DeleteIcon from '@mui/icons-material/Delete';
import { DockerCompose, DockerContainer, env, envArray, port, volumes } from '@core/domain/dockerCompose/models/DockerImage';
import AddIcon from '@mui/icons-material/Add';
import { MAX_PORT_VALUE } from '@core/domain/dockerCompose/ports/Utils';
import { portUIValidator, envVariableNameUIValidator, envVariableValueUIValidator, envVariablePathUIValidator, volumesUIValidator } from "@infrastructure/validators/InputValidator";

interface InputImageVolumesProps {
    setDisableNext: (disable: boolean) => void;
    handleAddVolume: (volume: volumes) => void;
    handleRemoveVolume: (index: number) => void;
    currentVolumes: volumes[];
  }

export const InputImageVolumes = (props: InputImageVolumesProps) => {

    const [volumesList, setVolumesList] = useState<Array<volumes>>(props.currentVolumes);
  
    const [machineRoute, setMachineRoute] = useState("");
    const [dockerRoute, setDockerRoute] = useState("");
  
    const handleMachineRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMachineRoute(event.target.value);
    }
  
    const handleDockerRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDockerRoute(event.target.value);
    }
  
    const handleVolumesChange = () => {
      setVolumesList([...volumesList, { internal: dockerRoute, external: machineRoute }]);
      props.handleAddVolume({ internal: dockerRoute, external: machineRoute });
      setMachineRoute('');
      setDockerRoute('');
    }
  
    const handleVolumesDelete = (index: number) => {
      setVolumesList(volumesList.filter((_, i) => i !== index));
      props.handleRemoveVolume(index);
    }
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Chemin sur votre machine"
        value={machineRoute} 
        onChange={handleMachineRouteChange}
        error={volumesUIValidator(machineRoute)?.error}
        />
        <InputTextForm label="Chemin dans le container"
        value={dockerRoute} 
        onChange={handleDockerRouteChange} 
        error={volumesUIValidator(dockerRoute)?.error}
        />
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant='outlined'
            onClick={handleVolumesChange}
            disabled={volumesUIValidator(machineRoute)?.error != undefined || volumesUIValidator(dockerRoute)?.error != undefined}>
              Ajouter
            </Button>
        </Box>
        <Table sx={{ margin: '1rem 0' }}>
          <TableHead>
            <TableRow>
              <TableCell  sx={{width:'20px'}}></TableCell>
              <TableCell><Typography sx={{fontWeight:600}}>Chemin local</Typography></TableCell>
              <TableCell><Typography sx={{fontWeight:600}}>Chemin container</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumesList.map((volume, index) => (
              <TableRow key={volume.internal}>
                <TableCell  sx={{width:'20px'}}>
                  <IconButton onClick={() => handleVolumesDelete(index)} component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{volume.external}</TableCell>
                <TableCell>{volume.internal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } 

  interface InputImageEnvVariablesProps {
    setDisableNext: (disable: boolean) => void;
    handleAddEnvVariable: (envVariable: env) => void;
    handleRemoveEnvVariable: (index: number) => void;
    currentEnv: envArray;
  }
  
  export const InputImageEnvVariables = (props: InputImageEnvVariablesProps) => {
  
    const [envList, setEnvList] = useState<Array<env>>(props.currentEnv ?? []);
  
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
  
    const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
    }
  
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }
  
    const handleEnvChange = () => {
      setEnvList([...envList, { key, value }]);
      props.handleAddEnvVariable({ key, value });
      setKey('');
      setValue('');
    }
  
    const handleEnvDelete = (index: number) => {
      setEnvList(envList.filter((_, i) => i !== index));
      props.handleRemoveEnvVariable(index);
    }
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm 
        label="Clé" 
        value={key} 
        onChange={handleKeyChange}
        error={envVariableNameUIValidator(key)?.error} 
        />
        <InputTextForm 
        label="Valeur" 
        value={value} 
        onChange={handleValueChange}
        error={envVariableValueUIValidator(value)?.error} 
        />
        <Box>
          <Button
           startIcon={<AddIcon />}
          variant='outlined'
          disabled={envVariableNameUIValidator(key)?.error != undefined || envVariableValueUIValidator(value)?.error != undefined}
          onClick={handleEnvChange}>
            Ajouter
          </Button>
        </Box>
        <Table sx={{ margin: '1rem 0' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{width:'20px'}}></TableCell>
              <TableCell><Typography sx={{fontWeight:600}}>Clé</Typography></TableCell>
              <TableCell><Typography sx={{fontWeight:600}}>Valeur</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envList.map((env, index) => (
              <TableRow key={env.key}>
                <TableCell sx={{width:'20px'}}>
                  <IconButton onClick={() => handleEnvDelete(index)}  component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{env.key}</TableCell>
                <TableCell>{env.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } 

  interface InputImagePortsProps {
    setDisableNext: (disable: boolean) => void;
    handleAddPort: (port: port) => void;
    handleRemovePort: (index: number) => void;
    currentPorts: port[];
  }
  
  export const InputImagePorts = (props: InputImagePortsProps) => {

    const [portList, setPortList] = useState<Array<port>>(props.currentPorts);
  
    const [internalPort, setInternalPort] = useState('0');
    const [externalPort, setExternalPort] = useState('0');

    const handleAddPort = () => {
      setPortList([...portList, { internal: internalPort, external: externalPort }]);
      props.handleAddPort({ internal: internalPort, external: externalPort });
      setInternalPort('');
      setExternalPort('');
    }

    const handlePortDelete = (index: number) => {
      setPortList(portList.filter((_, i) => i !== index));
      props.handleRemovePort(index);
    }

    const getPortNumber = (port: string|number): string => {
      if (Number(port) > MAX_PORT_VALUE) {
        return MAX_PORT_VALUE.toString();
      }
      if (Number(port) < 0) {
        return '0';
      }
      return port.toString();
    }
    
    const handleInternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInternalPort(getPortNumber(event.target.value));
    }
  
    const handleExternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExternalPort(getPortNumber(event.target.value));
    }
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Port interne"
        type="number" 
        value={internalPort} 
        onChange={handleInternalPortChange} 
        error={portUIValidator(internalPort)?.error}
        />
        <InputTextForm label="Port externe" 
        type="number" 
        value={externalPort} 
        onChange={handleExternalPortChange} 
        error={portUIValidator(externalPort)?.error}
        />
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant='outlined'
            disabled={portUIValidator(internalPort)?.error != undefined || portUIValidator(externalPort)?.error != undefined}
            onClick={handleAddPort}>
            Ajouter
          </Button>
        </Box>
        <Table sx={{ margin: '1rem 0' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '20px' }}></TableCell>
              <TableCell><Typography sx={{ fontWeight: 600 }}>Interne</Typography></TableCell>
              <TableCell><Typography sx={{ fontWeight: 600 }}>Externe</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portList.map((port, index) => (
              <TableRow key={port.internal}>
                <TableCell sx={{ width: '20px' }}>
                  <IconButton onClick={() => handlePortDelete(index)} component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{port.internal}</TableCell>
                <TableCell>{port.external}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>   
    );
  } 