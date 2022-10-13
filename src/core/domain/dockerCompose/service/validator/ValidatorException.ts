import {
  Error,
  error,
  Suggest,
  suggest,
  Warning,
  warning,
} from "../../../../application/commons/maybe/Maybe";
import { HostContainer } from "../../models/DockerImage";
import { DomainException } from "../../../../application/commons/exception/exception";
import { formatPrimitiveHCToString } from "../../../../application/downloader/format/FormatHelpers";

const valueMustBeInput: Error<DomainException> = error<string>(
  "Une valeur doit être saisie"
);
const keyMustBeInput: Error<DomainException> = error<string>(
  "Une clé doit être saisie"
);

const containerPathMustBeInput: Error<DomainException> = error<string>(
  "Un chemin container doit être saisie"
);

const versionIsLatest: Suggest<DomainException> = suggest<string>(
  "La version sera mise à jour automatiquement"
);
const hostPathMustBeInput: Error<DomainException> = error<string>(
  "Un chemin host doit être saisie"
);

const serviceNeedAnAlias = (service: string): Error<DomainException> =>
  error<string>(`le service : ${service} est déjà existant`);
const defaultPortSuggest = (
  value: HostContainer<string>
): Warning<DomainException> =>
  warning<string>(
    `${value} est le port par default, il est préférable de le modifier`
  );
const portAlreadyInUse = (value: string): Error<DomainException> =>
  error<string>(`Le port Host :  ${value} est déjà utilisé`);

export {
  valueMustBeInput,
  keyMustBeInput,
  containerPathMustBeInput,
  hostPathMustBeInput,
  serviceNeedAnAlias,
  defaultPortSuggest,
  portAlreadyInUse,
  versionIsLatest,
};
