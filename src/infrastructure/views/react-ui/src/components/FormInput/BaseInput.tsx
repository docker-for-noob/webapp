import React from 'react';
import {
    FormControl,
    TextField,
    Typography,
    Tooltip,
    styled,
    TooltipProps,
    tooltipClasses,
    Input,
    FilledInput,
    useTheme
} from "@mui/material";
import {
    acquireHelperText,
    acquireValidationColor,
    handleError,
    handleFocus,
    Maybe
} from "@core/application/commons/maybe/Maybe";

interface InputTextFormProps {
    label: string;
    value: any;
    type?: string;
    variant?: "standard" | "outlined" | "filled" | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: Maybe<string>;
}
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
        height: 30
    },
});
export function InputTextForm(props: InputTextFormProps) {
    const theme = useTheme()
    const color = acquireValidationColor(props.error)

    return (
        <FormControl sx={{ margin: '1rem 0' }}>
            <CustomWidthTooltip title='Nisi cillum laboris officia duis ut dolore culpa.' followCursor={true}>
                <TextField
                    label={props.label}
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
            </CustomWidthTooltip>
        </FormControl>
    );
}