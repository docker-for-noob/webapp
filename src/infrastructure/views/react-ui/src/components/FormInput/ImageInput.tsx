import React, { ChangeEvent, useState } from 'react';
import { FormControl, InputLabel, Input, FilledInput, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { VolumeType, EnvType } from '../Form/ServiceForm';
import { InputTextForm } from './BaseInput';
import DeleteIcon from '@mui/icons-material/Delete';

interface InputImageProps {
    setDisableNext: (disable: boolean) => void
  }

export const InputImageVolumes = (props: InputImageProps) => {

    const [volumesList, setVolumesList] = useState<Array<VolumeType>>([]);
  
    const [machineRoute, setMachineRoute] = useState("");
    const [dockerRoute, setDockerRoute] = useState("");
  
    const handleMachineRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMachineRoute(event.target.value);
    }
  
    const handleDockerRouteChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDockerRoute(event.target.value);
    }
  
    const handleVolumesChange = () => {
      setVolumesList([...volumesList, { machineRoute, dockerRoute }]);
    }
  
    const handleVolumesDelete = (index: number) => {
      setVolumesList(volumesList.filter((_, i) => i !== index));
    }
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Chemin sur votre machine" value={machineRoute} onChange={handleMachineRouteChange} />
        <InputTextForm label="Chemin dans le container" value={dockerRoute} onChange={handleDockerRouteChange} />
        <Button variant='contained' onClick={handleVolumesChange} sx={{ margin: '0.5rem 1rem' }}>Ajouter</Button>
        <Table sx={{ margin: '1rem 0' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{width: '4rem'}}></TableCell>
              <TableCell>Chemin local</TableCell>
              <TableCell>Chemin container</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumesList.map((volume, index) => (
              <TableRow key={volume.machineRoute}>
                <IconButton onClick={() => handleVolumesDelete(index)} sx={{ margin: '0.5rem 1rem' }} component="label">
                  <DeleteIcon />
                </IconButton>
                <TableCell>{volume.machineRoute}</TableCell>
                <TableCell>{volume.dockerRoute}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } 
  
  export const InputImageEnvVariables = (props: InputImageProps) => {
  
    const [envList, setEnvList] = useState<Array<EnvType>>([]);
  
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
    }
  
    const handleEnvDelete = (index: number) => {
      setEnvList(envList.filter((_, i) => i !== index));
    }
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Clé" value={key} onChange={handleKeyChange} />
        <InputTextForm label="Valeur" value={value} onChange={handleValueChange} />
        <Button variant='contained' onChange={handleEnvChange} size="medium" sx={{ margin: '0.5rem 1rem' }}>Ajouter</Button>
        <Table sx={{ margin: '1rem 0' }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Clé</TableCell>
              <TableCell>Valeur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envList.map((env, index) => (
              <TableRow key={env.key}>
                <IconButton onClick={() => handleEnvDelete(index)} sx={{ margin: '0.5rem 1rem' }} component="label">
                  <DeleteIcon />
                </IconButton>
                <TableCell>{env.key}</TableCell>
                <TableCell>{env.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } 
  
  export const InputImagePorts = (props: InputImageProps) => {
  
    const [internalPort, setInternalPort] = useState(0);
    const [externalPort, setExternalPort] = useState(0);
    
    const handleInternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInternalPort(parseInt(event.target.value));
    }
  
    const handleExternalPortChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExternalPort(parseInt(event.target.value));
    }
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InputTextForm label="Port interne" type="number" value={internalPort} onChange={handleInternalPortChange} />
        <InputTextForm label="Port externe" type="number" value={externalPort} onChange={handleExternalPortChange} />
      </Box>
    );
  } 