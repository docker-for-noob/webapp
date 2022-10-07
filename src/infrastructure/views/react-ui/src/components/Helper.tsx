import React, {useState} from 'react';
import {Card, CardActions, CardContent, Link, Typography, Box, Button} from '@mui/material';

export interface HelperData {
    title: string;
    content: string;
    link: string;
}

export function Helper(props: HelperData) {

    return (
        <Box sx={{backgroundColor:'#F0F0F0',paddingX:3,paddingY:2}}>
            <Box>
                <Typography variant="h3">{props.title}</Typography>
            </Box>
            <Box sx={{marginY:2}}>
                <Typography variant="body2">
                {props.content}
                </Typography>
            </Box>
            <Link target="_blank" rel="noreferrer" href={props.link}>
                <Button variant="contained">
                    En savoir plus
                </Button>
            </Link>

        </Box>
    )
}