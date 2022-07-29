import React from 'react';
import { FormControl, InputLabel, FilledInput, Input } from "@mui/material";

interface InputTextFormProps {
    label: string;
    value: any;
    type?: string;
    variant?: "standard" | "outlined" | "filled" | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export function InputTextForm(props: InputTextFormProps) {
    return (
        <FormControl sx={{ margin: '1rem 0' }}>
          <InputLabel htmlFor="version">{props.label}</InputLabel>
          {props.variant === "filled" ?
           (<FilledInput type={props.type ?? 'text'} id="version" value={props.value} onChange={props.onChange} disabled={props.disabled ?? false} />)
           :
           (<Input type={props.type ?? 'text'} id="version" value={props.value} onChange={props.onChange} disabled={props.disabled ?? false}/>)
           }
        </FormControl>
    );
}