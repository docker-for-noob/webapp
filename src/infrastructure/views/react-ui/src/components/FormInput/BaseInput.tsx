import React from 'react';
import {
    Box,
    FormControl,
    TextField,
    Typography,
    styled,
    Input,
    IconButton,
    FilledInput,
    useTheme,
    Tooltip
} from "@mui/material";
import {
    acquireHelperText,
    acquireValidationColor,
    handleError,
    handleFocus,
    Maybe
} from "@core/application/commons/maybe/Maybe";
import HelpIcon from '@mui/icons-material/Help';

interface InputTextFormProps {
    label: string;
    value: any;
    type?: string;
    variant?: "standard" | "outlined" | "filled" | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: Maybe<string>;
    tooltip?: string;
}

export function InputTextForm(props: InputTextFormProps) {
    const theme = useTheme()
    const color = acquireValidationColor(props.error)

    return (
        <FormControl sx={{ margin: '1rem 0' }}>
                <TextField
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
                            {props.label}
                            <Tooltip placement="right" title={props.tooltip || 'lorem ipsum dolor sit amet'}>
                                <IconButton aria-label="help" size="small">
                                    <HelpIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                    value={props.value}
                    type={props.type || 'text'}
                    variant={props.variant || 'standard'}
                    onChange={props.onChange}
                    disabled={props.disabled}
                    error={handleError(props.error)}
                    color={color}
                    focused={handleFocus(props.error)}
                    helperText={<Typography sx={{ color: theme.palette[color!].main }}>
                        {acquireHelperText(props.error)}
                    </Typography>}
                />
        </FormControl>
    );
}