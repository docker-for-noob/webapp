import { DockerContainer } from "@core/domain/dockerCompose/models/DockerImage";
import { FormControlLabel, Switch } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from "react";
import { InputTextForm } from "../../FormInput/BaseInput";
import { serviceNameUIValidator, containerNameUIValidator } from "@infrastructure/validators/InputValidator";

interface ServiceFormStep1Props {
    setDisableNext: (disable: boolean) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>;
    container: DockerContainer;
}

export function ServiceFormStep1(props: ServiceFormStep1Props) {
    const [serviceName, setServiceName] = useState(props.container.ServiceName);
    const [alias, setAlias] = useState(props.container.ContainerName);
    const [hasAlias, setHasAlias] = useState(!!props.container.ContainerName);

    const nextStepIsDisabled = () => {
        return !serviceName || (hasAlias && !alias);
    };

    useEffect(() => {
        props.setDisableNext(nextStepIsDisabled());
    }, [serviceName, alias, hasAlias]);

    useEffect(() => {
        props.setContainer((prev: DockerContainer) => {
            return {
                ...prev,
                ServiceName: serviceName,
                ContainerName: alias
            }
        })
    }, [serviceName, alias]);

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

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
            <InputTextForm
                error={serviceNameUIValidator(serviceName)?.error}
                label="Nom du service"
                variant="filled"
                value={serviceName}
                onChange={handleServiceNameChange}
            />

            <FormControlLabel
                control={<Switch checked={hasAlias} onChange={handleSwitch} />}
                label="Ajouter un alias"
            />

            {hasAlias && (
                <InputTextForm
                    error={containerNameUIValidator(alias)?.error}
                    variant="filled"
                    label="Alias"
                    value={alias}
                    onChange={handleAliasChange}
                />
            )}
        </form>
    );
}