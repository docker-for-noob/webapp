import {DockerCompose, DockerContainer} from "@core/domain/dockerCompose/models/DockerImage";
import {FormControlLabel, Switch, Box, Autocomplete, TextField} from "@mui/material";
import React, {Dispatch, SetStateAction, useState, useEffect, ChangeEvent} from "react";
import {InputTextForm} from "../../FormInput/BaseInput";
import {containerNameUIValidator} from "@infrastructure/validators/InputValidator";
import {ServiceNameValidator} from "@core/application/validators/InputValidators";
import { handleError } from "@core/application/commons/maybe/Maybe";

interface ServiceFormStep1Props {
    setDisableNext: (disable: boolean) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>;
    container: DockerContainer;
    dockerCompose: DockerCompose;
}

export function ServiceFormStep1(props: ServiceFormStep1Props) {
    const [serviceName, setServiceName] = useState(props.container.ServiceName);
    const [alias, setAlias] = useState(props.container.ContainerName);
    const [hasAlias, setHasAlias] = useState(!!props.container.ContainerName);
    const [hasDependsOn,setHasDependsOn] = useState(props.container.DependsOn ? true : false)
    const [dependsOn,setDependsOn] = useState(props.container.DependsOn ? props.container.DependsOn : undefined)
    const allServiceName = props.dockerCompose.Container.map(e => e.ServiceName)

    const nextStepIsDisabled = () => {
        return Boolean(handleError(ServiceNameValidator(allServiceName)(serviceName)) || (hasAlias && handleError(containerNameUIValidator(alias))));
    }

    useEffect(() => {
        props.setDisableNext(nextStepIsDisabled());
    }, [serviceName, alias, hasAlias]);

    useEffect(() => {
        props.setContainer((prev: DockerContainer) => {
            return {
                ...prev,
                ServiceName: serviceName,
                ContainerName: alias }
        })
    }, [serviceName, alias]);

    useEffect(()=>{
        if(hasDependsOn && dependsOn){
            props.setContainer((prev: DockerContainer) => {
                return {
                    ...prev,
                    DependsOn:dependsOn}
            })
        }
    },[dependsOn,hasDependsOn])      

    const handleServiceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setServiceName(event.target.value);
    };

    const handleAliasChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAlias(event.target.value);
    };

    const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
        setHasAlias(event.target.checked);
        setAlias('');
    };

    const handleSwitchDependsOn = (event: ChangeEvent<HTMLInputElement>) => {
        setHasDependsOn(event.target.checked)
        setDependsOn('')
    }

    const handleChangeDependsOn = (serviceName: string) => {
        setDependsOn(serviceName)
    }

    return (
        <form style={{display: "flex", flexDirection: "column"}}>
            <InputTextForm
                error={ServiceNameValidator(allServiceName)(serviceName)}
                label="Nom du service"
                variant="filled"
                value={serviceName}
                onChange={handleServiceNameChange}
            />

            <FormControlLabel
                control={<Switch checked={hasAlias} onChange={handleSwitch}/>}
                label="Ajouter un alias"
            />

            {hasAlias && (
                <InputTextForm
                    error={containerNameUIValidator(alias)}
                    variant="filled"
                    label="Alias"
                    value={alias}
                    onChange={handleAliasChange}
                />
            )}

            {props.dockerCompose.Container.length > 0 && 
                <Box>
                    <FormControlLabel control={<Switch checked={hasDependsOn} onChange={handleSwitchDependsOn} />} label="Ajouter une dépendance " />
                    {hasDependsOn && 
                        <Autocomplete
                            id="version-select"
                            options={props.dockerCompose.Container}
                            autoHighlight
                            getOptionLabel={(container) => container.ServiceName}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ margin: '1rem 0' }}
                                label="Choisissez une dépendance"
                                variant="filled"
                                inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                            )}
                            onChange={(_event: any, newValue: DockerContainer | null) => { handleChangeDependsOn(newValue?.ServiceName ?? "");}}
                        />
                    }
                </Box>
            }

        </form>
    );
}