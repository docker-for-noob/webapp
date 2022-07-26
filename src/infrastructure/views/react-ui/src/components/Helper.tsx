import React, {useState} from 'react';
import {Card, CardActions, CardContent, Link, Typography} from '@mui/material';

export interface HelperData {
    title: string;
    content: string;
    link: string;
}

export function Helper(props: HelperData) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={props.link} underline="hover">Learn More</Link>
            </CardActions>
        </Card>
    )
}