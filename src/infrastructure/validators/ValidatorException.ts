import { InfrastructureException } from "../../core/application/commons/exception/exception";
import { error, Error } from "../../core/application/commons/maybe/Maybe";

const requiredError: Error<InfrastructureException> = error(
  "Ce champ est requis"
);
const mustBeNumberError: Error<InfrastructureException> = error(
  "Ce champ doit être un Nombre"
);
const mustBePositiveError: Error<InfrastructureException> = error(
  "Ce champ doit être un Nombre positif"
);
const mustBeStringError: Error<InfrastructureException> = error(
  "Ce champ doit être une chaine de caractère"
);
const mustNotContainsWhiteSpaceError: Error<InfrastructureException> = error(
  "Ce champ ne doit pas contenir d'espace"
);
const mustNotContainsUppercaseError: Error<InfrastructureException> = error(
  "Ce champ ne doit pas contenir de majuscule"
);
const mustBePathError: Error<InfrastructureException> = error(
  "Ce champ doit contenir un chemin d'accès"
);
const mustBeInUpperCaseError: Error<InfrastructureException> = error(
  "Ce champ doit contenir exclusivement des majuscules"
);
const valueMustBeUniqueError: Error<InfrastructureException> = error(
  "La valeur doit être unique"
);
const mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError: Error<InfrastructureException> =
  error(
    "Ce champ ne doit pas contenir de caractère spéciaux hormis underscore, slash et les point"
  );
const mustNotContainsSpecialCharactersExceptUnderscoreError: Error<InfrastructureException> =
  error(
    "Ce champ ne doit pas contenir de caractère spéciaux hormis underscore"
  );
const mustNotContainsSpecialCharactersExceptEqualsError: Error<InfrastructureException> =
  error("Ce champ ne doit pas contenir de caractère spéciaux hormis égale");

export {
  requiredError,
  mustBeNumberError,
  mustBePositiveError,
  mustBeStringError,
  mustBePathError,
  mustNotContainsWhiteSpaceError,
  mustNotContainsUppercaseError,
  valueMustBeUniqueError,
  mustBeInUpperCaseError,
  mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
  mustNotContainsSpecialCharactersExceptUnderscoreError,
  mustNotContainsSpecialCharactersExceptEqualsError,
};
