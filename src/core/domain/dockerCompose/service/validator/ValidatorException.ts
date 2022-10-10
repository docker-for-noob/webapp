import {error, suggest, warning} from "../../../../application/commons/maybe/Maybe";
import {formatPrimitiveHCToString} from "../../../../application/downloader/format/FormatHelpers";
import {HostContainer} from "../../models/DockerImage";

const valueMustBeInput = error<string>("Une valeur doit être saisie");
const keyMustBeInput = error<string>("Une clé doit être saisie");
const serviceNeedAnAlias = (service: string) => warning<string>(`le service : ${service} doit avoir un alias`);
const defaultPortSuggest = (value:  HostContainer<string>) => suggest<string>(`${formatPrimitiveHCToString(value)} est le port par default, il est préférable de le modifier`);
const portAlreadyInUse = (value:  HostContainer<string>) => error<string>(`Le port Host :  ${value.container} est déjà utilisé`)


export {
    valueMustBeInput,
    keyMustBeInput,
    serviceNeedAnAlias,
    defaultPortSuggest,
    portAlreadyInUse
}