import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, Typography, Box } from '@mui/material';
import { downloadDockerCompose } from '@core/application/downloader/Downloader';
import { DockerCompose } from '@core/domain/dockerCompose/models/DockerImage';

const commandList = [
    {
        for: 'php:apache',
        label: 'lore ipsum dolor sit amet consectetur adipiscing elit',
        command: 'sh -c "docker-php-ext-install pdo pdo_mysql && apache2-foreground"'
    },
    {
        for: 'mysql:8.0.30',
        label: 'lore ipsum dolor sit amet consectetur adipiscing elit',
        command: 'mysqld --sql_mode="" --character-set-server=utf8 --collation-server=utf8mb3_unicode_ci --init-connect=\'SET NAMES UTF8;\''
    }
]

interface DialogDownloadProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    dockerCompose?: DockerCompose;
    setDockerCompose?: Dispatch<SetStateAction<DockerCompose>>;
}

export default function DialogDownload(props: DialogDownloadProps) {

    const [dockerComposeWithCommand, setDockerComposeWithCommand] = React.useState<DockerCompose>();

    const selectedCommandList = commandList.filter((command) => {
        return props.dockerCompose?.Container.find((container) => {
            return container.Tag === command.for;
        })
    });

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleDownload = () => {
        if (props.dockerCompose) {
            downloadDockerCompose("docker-compose.yml", dockerComposeWithCommand ?? props.dockerCompose);
        }
        props.setOpen(false);
    };

    useEffect(() => {
        console.log(dockerComposeWithCommand);
    }, [dockerComposeWithCommand]);

    const handleChange = (imageName: string, command: string) => {
        if (props.dockerCompose) {
            let dockerComposeCopy: DockerCompose = dockerComposeWithCommand ?? props.dockerCompose;
            dockerComposeCopy.Container.forEach((container) => {
                if (container.Tag === imageName) {
                    container.Command = command;
                }
            });
            setDockerComposeWithCommand(dockerComposeCopy);
        }
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Télécharger le docker-compose.yml</DialogTitle>
            <DialogContent>
                {selectedCommandList.length > 0 ?
                    (<DialogContentText sx={{ mb: 2 }}>
                        Nous avons trouvé des commandes personnalisées pour votre docker-compose.yml.
                        Voulez-vous les ajouter ?
                    </DialogContentText>)
                    :
                    (<DialogContentText sx={{ mb: 2 }}>
                        Nous n'avons pas trouvé de commandes personnalisées pour votre docker-compose.yml.
                        Vous pouvez directement télécharger le fichier.
                    </DialogContentText>)
                }
                {selectedCommandList.map((command, index) => {
                    return (
                        <Box sx={{ mb: 2 }} key={index}>
                            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                                Commandes trouvées pour : {command.for}
                            </Typography>
                            <span style={{ marginBottom: '10px' }}>{command.label}</span>
                            <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, padding: 1, backgroundColor: '#5D5D5D', color: '#fff' }}>
                                <Checkbox sx={{ color: '#fff' }} onChange={() => handleChange(command.for, command.command)} />
                                <Typography sx={{ fontFamily: 'monospace' }}>{command.command}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleDownload} variant="contained">Télécharger</Button>
            </DialogActions>
        </Dialog>
    );
}
