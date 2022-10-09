import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { ServiceReference } from "@core/domain/serviceReference/models/service";
import { DockerCompose,  } from '@core/domain/dockerCompose/models/DockerImage';
import { yamlAdapter } from '../../../../format/yaml/YamlAdapter';

interface PrevizualizerProps {
    dockerCompose?: DockerCompose;
    rerender?: number;
}

export function Previzualizer(props: PrevizualizerProps) {

    return (
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
    );
}