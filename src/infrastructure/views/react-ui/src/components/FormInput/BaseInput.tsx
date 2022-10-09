import React from 'react';
import { FormControl, InputLabel, FilledInput, Input, TextField } from "@mui/material";

interface InputTextFormProps {
    label: string;
    value: any;
    type?: string;
    variant?: "standard" | "outlined" | "filled" | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
}

export function InputTextForm(props: InputTextFormProps) {
    return (
        <FormControl sx={{ margin: '1rem 0' }}>
            <TextField
                label={props.label}
                value={props.value}
                type={props.type || 'text'}
                variant={props.variant || 'standard'}
                onChange={props.onChange}
                disabled={props.disabled}
                error={props.error ? true : false}
                helperText={props.error}
            />
        </FormControl>
    );
}