import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { ServiceReference } from "@core/domain/serviceReference/models/service";

interface PrevizualizerProps {
    services: ServiceReference[];
}

export function Previzualizer(props: PrevizualizerProps) {

    return (
        <Paper sx={{padding: '1rem', backgroundColor: '#5D5D5D', color: '#fff'}}>
            <Typography>
                services:
            </Typography>
            {props.services.map((service) => (
                <Box key={service.key}>
                    <Typography>
                        {"  container_name: "+service.name}
                    </Typography>
                    <Typography>
                        {"  alias: "+service.alias}
                    </Typography>
                    <Typography key="image">
                        {"  image:"}
                    </Typography>
                    <Typography>
                        {"    id: "+service.image.id}
                    </Typography>
                    <Typography>
                        {"    name: "+service.image.name}
                    </Typography>
                </Box>
            ))}  
        </Paper>
    );
}