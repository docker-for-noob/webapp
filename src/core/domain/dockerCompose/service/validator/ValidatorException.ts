import {Error, error, Suggest, suggest, Warning, warning} from "../../../../application/commons/maybe/Maybe";
import {formatPrimitiveHCToString} from "../../../../application/downloader/format/FormatHelpers";
import {HostContainer} from "../../models/DockerImage";
import {DomainException} from "../../../../application/commons/exception/exception";

const valueMustBeInput: Error<DomainException> = error<string>("Une valeur doit être saisie");
const keyMustBeInput: Error<DomainException> = error<string>("Une clé doit être saisie");
const serviceNeedAnAlias = (service: string): Warning<DomainException> => warning<string>(`le service : ${service} doit avoir un alias`);
const defaultPortSuggest = (value: HostContainer<string>): Suggest<DomainException> => suggest<string>(`${formatPrimitiveHCToString(value)} est le port par default, il est préférable de le modifier`);
const portAlreadyInUse = (value: HostContainer<string>): Error<DomainException> => error<string>(`Le port Host :  ${value.container} est déjà utilisé`)


export {
    valueMustBeInput,
    keyMustBeInput,
    serviceNeedAnAlias,
    defaultPortSuggest,
    portAlreadyInUse
}