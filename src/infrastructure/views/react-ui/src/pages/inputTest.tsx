import React, {ChangeEvent, useState} from "react";
import {
    Maybe,
    suggest,
    error,
    isError,
    isWarning,
    isSuggest,
    getSuggest,
    getWarning,
    getError,
    warning
} from "@core/application/commons/maybe/Maybe";
import {FormControl, TextField, Typography,useTheme } from "@mui/material";

export function InputTest() {
    const [serviceName, setServiceName] = useState("");

    const handleServiceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceName(event.target.value);
    };

    const suggestTest = suggest<string>("this is a suggest")
    const warningTest = warning<string>("this is a warning")
    const errorTest = error("this is an error")



    return (
        <>
            {/*<InputTextFormTest*/}
            {/*    error={errorTest}*/}
            {/*    label="Nom du service"*/}
            {/*    variant="filled"*/}
            {/*    value={serviceName}*/}
            {/*    onChange={handleServiceNameChange}*/}
            {/*/>*/}
        </>
    )
}

interface InputTextFormProps {
    label: string;
    value: any;
    type?: string;
    variant?: "standard" | "outlined" | "filled" | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: Maybe<string>;
}

export function InputTextFormTest(props: InputTextFormProps) {
    // const theme = useTheme()
    // const color = acquireValidationColor(props.error)
    //
    // return (
    //     <FormControl sx={{margin: '1rem 0'}}>
    //         <TextField
    //             label={props.label}
    //             value={props.value}
    //             type={props.type || 'text'}
    //             variant={props.variant || 'standard'}
    //             onChange={props.onChange}
    //             disabled={props.disabled}
    //             error={handleError(props.error)}
    //             color={color}
    //             focused={handleError(props.error)}
    //             helperText={<Typography sx={{color: theme.palette[color!].main}}>
    //                 {acquireHelperText(props.error)}
    //             </Typography>}
    //         />
    //     </FormControl>
    // );
}