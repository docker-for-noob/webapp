export const REGEXP_PATH: RegExp = new RegExp(/^(.+)\/([^\/]+)|(.+)\/$/i);
export const REGEXP_SPECIAL_CHARACTERS_EXCEPT_EQUALS: RegExp = new RegExp(
  /[^a-zA-Z0-9=]/
);
export const REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE_SLASH_AND_POINT: RegExp =
  new RegExp(/[^a-zA-Z0-9./_-]/);
export const REGEXP_SPECIAL_CHARACTERS_EXCEPT_UNDERSCORE: RegExp = new RegExp(
  /[^a-zA-Z0-9_-]/
);
export const REGEXP_UPPERCASE: RegExp = new RegExp(/[A-Z]/);
