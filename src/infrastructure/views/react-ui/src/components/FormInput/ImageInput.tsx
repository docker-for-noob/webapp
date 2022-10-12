import React, { ChangeEvent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { FormControl, InputLabel, Input, FilledInput, Box, Button, IconButton, Table, Typography, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { VolumeType, EnvType } from '../Form/ServiceForm/ServiceForm';
import { InputTextForm } from './BaseInput';
import DeleteIcon from '@mui/icons-material/Delete';
import { DockerCompose, DockerContainer, env, envArray, port, volumes } from '@core/domain/dockerCompose/models/DockerImage';
import AddIcon from '@mui/icons-material/Add';
import { MAX_PORT_VALUE } from '@core/domain/dockerCompose/ports/Utils';
import { portUIValidator, envVariableNameUIValidator, envVariablePathUIValidator, volumesUIValidator } from "@infrastructure/validators/InputValidator";

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

    useEffect(() => {
      setVolumesList(props.currentVolumes);
    }, [props.currentVolumes]);
  
    const handleMachineRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMachineRoute(event.target.value);
    }
  
    const handleDockerRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDockerRoute(event.target.value);
    }
  
    const handleVolumesChange = () => {
      setVolumesList([...volumesList, { host: machineRoute, container: dockerRoute }]);
      props.handleAddVolume({ host: machineRoute, container: dockerRoute });
      setMachineRoute('')
      setDockerRoute('')
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
              <TableCell><Typography sx={{fontWeight:600}}>Chemin machine</Typography></TableCell>
              <TableCell><Typography sx={{fontWeight:600}}>Chemin container</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumesList.map((volume, index) => (
              <TableRow key={index}>
                <TableCell  sx={{width:'20px'}}>
                  <IconButton onClick={() => handleVolumesDelete(index)} component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{volume.host}</TableCell>
                <TableCell>{volume.container}</TableCell>
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
    currentEnv: Array<env>;
  }
  
  export const InputImageEnvVariables = (props: InputImageEnvVariablesProps) => {
  
    const [envList, setEnvList] = useState<Array<env>>(props.currentEnv ?? []);
  
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    useEffect(() => {
      setEnvList(props.currentEnv);
    }, [props.currentEnv]);

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
        />
        <Box>
          <Button
           startIcon={<AddIcon />}
          variant='outlined'
          disabled={envVariableNameUIValidator(key)?.error != undefined}
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
              <TableRow key={index}>
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
  
    const [internalPort, setInternalPort] = useState(0);
    const [externalPort, setExternalPort] = useState(0);

    useEffect(() => {
      setPortList(props.currentPorts);
    }, [props.currentPorts]);

    const handleAddPort = () => {
      setPortList([...portList, { host: String(internalPort), container: String(externalPort) }]);
      props.handleAddPort({ host: String(internalPort), container: String(externalPort) });
      setInternalPort(0);
      setExternalPort(0);
    }

    const handlePortDelete = (index: number) => {
      setPortList(portList.filter((_, i) => i !== index));
      props.handleRemovePort(index);
    }

    const getPortNumber = (port: number): number => {
      if (port > MAX_PORT_VALUE) {
        return MAX_PORT_VALUE;
      }
      if (port < 0) {
        return 0;
      }
      return port;
    }
    
    const handleInternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInternalPort(getPortNumber(Number(event.target.value)));
    }

    const handleExternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExternalPort(getPortNumber(Number(event.target.value)));
    }
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Port machine"
        type="number"
        value={internalPort}
        onChange={handleInternalPortChange}
        error={portUIValidator(String(internalPort))?.error}
        />
        <InputTextForm label="Port container"
        type="number"
        value={externalPort}
        onChange={handleExternalPortChange}
        error={portUIValidator(String(externalPort))?.error}
        />
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant='outlined'
            disabled={portUIValidator(String(internalPort))?.error != undefined || portUIValidator(String(externalPort))?.error != undefined}
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
              <TableRow key={index}>
                <TableCell sx={{ width: '20px' }}>
                  <IconButton onClick={() => handlePortDelete(index)} component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{port.host}</TableCell>
                <TableCell>{port.container}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>   
    );
  };