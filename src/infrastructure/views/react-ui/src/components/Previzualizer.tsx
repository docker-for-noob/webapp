import React, { Dispatch, SetStateAction } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DockerCompose,  } from '@core/domain/dockerCompose/models/DockerImage';
import DownloadIcon from '@mui/icons-material/Download';
import { formatDockerComposeToPrevisualisation } from '@core/application/downloader/format/Formatter';
import DialogDownload from './DialogDownload';

interface PrevizualizerProps {
    dockerCompose?: DockerCompose;
    setDockerCompose?: Dispatch<SetStateAction<DockerCompose>>;
    rerender?: number;
}

export function Previzualizer(props: PrevizualizerProps) {

    const [open, setOpen] = React.useState(false);

    const handleDownloadYaml = async () => {
        if(props.dockerCompose){
            setOpen(true);
        }else{
            alert('No docker-compose.yml')
        }
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
            <Box sx={{marginTop:2}}>
                <LoadingButton onClick={handleDownloadYaml} startIcon={<DownloadIcon />} variant="contained">
                    Télécharger
                </LoadingButton>
            </Box>
            <DialogDownload dockerCompose={props.dockerCompose} open={open} setOpen={setOpen} setDockerCompose={props.setDockerCompose} />
        </Box>
    );
}
