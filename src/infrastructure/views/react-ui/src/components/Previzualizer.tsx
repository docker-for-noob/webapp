import {Box, Paper, Typography, Button} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import React, {useState} from 'react';
import {DockerCompose,} from '@core/domain/dockerCompose/models/DockerImage';
import DownloadIcon from '@mui/icons-material/Download';
import {downloadDockerCompose} from '@core/application/downloader/Downloader';
import {formatDockerComposeToPrevisualisation} from '@core/application/downloader/format/Formatter';


interface PrevizualizerProps {
    dockerCompose?: DockerCompose;
    rerender?: number;
}

export function Previzualizer(props: PrevizualizerProps) {


    const [isLoading, setIsLoading] = useState(false)

    const handleDownloadYaml = async () => {
        setIsLoading(true)
        if (props.dockerCompose) {
            const result = await downloadDockerCompose("docker-compose.yml", props.dockerCompose)
            setIsLoading(false)
        } else {
            alert('No docker-compose.yml')
        }
        setIsLoading(false)
    }

    const handlePrevizualization = (dockerCompose: DockerCompose): string => {
        return formatDockerComposeToPrevisualisation(dockerCompose)
    }

    return (
        <Box sx={{backgroundColor: '#F0F0F0', paddingX: 3, paddingY: 2}}>
            <Paper sx={{padding: '1rem', backgroundColor: '#5D5D5D', color: '#fff'}}>
                <Typography component="div">
                    <pre style={{whiteSpace: 'pre-wrap'}}>
                        {props.dockerCompose ?

                            handlePrevizualization(props.dockerCompose)
                            :
                            'No docker-compose.yml'
                        }
                    </pre>
                </Typography>
            </Paper>
            <Box sx={{marginTop: 2}}>
                <LoadingButton loading={isLoading} onClick={handleDownloadYaml} startIcon={<DownloadIcon/>}
                               variant="contained">
                    Télécharger
                </LoadingButton>
            </Box>
        </Box>
    );
}
