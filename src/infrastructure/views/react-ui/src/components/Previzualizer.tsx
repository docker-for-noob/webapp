import { Box, Paper, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect,useState } from 'react';
import { ServiceReference } from "@core/domain/serviceReference/models/service";
import { DockerCompose,  } from '@core/domain/dockerCompose/models/DockerImage';
import { yamlAdapter } from '../../../../format/yaml/YamlAdapter';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadDockerCompose } from '@core/application/downloader/Downloader';


interface PrevizualizerProps {
    dockerCompose?: DockerCompose;
    rerender?: number;
}

export function Previzualizer(props: PrevizualizerProps) {


    const [isLoading,setIsLoading] = useState(false)

    const handleDownloadYaml = async () => {
        setIsLoading(true) 
        if(props.dockerCompose){
            const result = await downloadDockerCompose("docker-compose.yml",props.dockerCompose)
        }else{
            alert('No docker-compose.yml')
        }
        setIsLoading(false)
        
    }

    return (
        <Box sx={{backgroundColor:'#F0F0F0',paddingX:3,paddingY:2}}>
            <Paper sx={{ padding: '1rem', backgroundColor: '#5D5D5D', color: '#fff' }}>
                <Typography>
                    <pre>
                        {props.dockerCompose ?

                            JSON.stringify(yamlAdapter((props.dockerCompose)), null, 2)
                            :
                            'No docker-compose.yml'
                        }
                    </pre>
                </Typography>
            </Paper>
            <Box sx={{marginTop:2}}>
                <LoadingButton loading={isLoading} onClick={handleDownloadYaml} startIcon={<DownloadIcon />} variant="contained">
                    Télécharger
                </LoadingButton>
            </Box>
            
        </Box>
    );
}




function downloadFile(yaml: any){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(yaml));
    element.setAttribute('download', 'docker-compose.yml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }