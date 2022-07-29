import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import {ServiceReference} from "@domain/serviceReference/models/service";

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
                <Box>
                    <Typography key={service.name}>
                        {"  container_name: "+service.name}
                    </Typography>
                    <Typography key={service.alias}>
                        {"  alias: "+service.alias}
                    </Typography>
                    <Typography key="image">
                        {"  image:"}
                    </Typography>
                    <Typography key={service.image.id}>
                        {"    id: "+service.image.id}
                    </Typography>
                    <Typography key={service.image.name}>
                        {"    name: "+service.image.name}
                    </Typography>
                </Box>
            ))}  
        </Paper>
    );
}