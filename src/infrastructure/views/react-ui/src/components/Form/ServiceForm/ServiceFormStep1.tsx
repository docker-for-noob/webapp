import { DockerContainer } from "@core/domain/dockerCompose/models/DockerImage";
import { FormControlLabel, Switch } from "@mui/material";
import React, { Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from "react";
import { InputTextForm } from "src/components/FormInput/BaseInput";

interface ServiceFormStep1Props {
    setDisableNext: (disable: boolean) => void;
    setContainer: Dispatch<SetStateAction<DockerContainer>>
}

export function ServiceFormStep1(props: ServiceFormStep1Props) {
    const [serviceName, setServiceName] = useState("");
    const [alias, setAlias] = useState("");

    const [hasAlias, setHasAlias] = useState(false);

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
    };

    return (
        <form style={{ display: "flex", flexDirection: "column" }}>
            <InputTextForm
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
                    variant="filled"
                    label="Alias"
                    value={alias}
                    onChange={handleAliasChange}
                />
            )}
        </form>
    );
}