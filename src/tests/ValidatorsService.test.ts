import {
  mustBeInUpperCaseError,
  mustBePathError,
  mustBeStringError,
  mustNotContainsSpecialCharactersExceptUnderscoreError,
  mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
  mustNotContainsWhiteSpaceError,
  requiredError,
} from "../infrastructure/validators/ValidatorException";
import {
  containerNameUIValidator,
  envVariableNameUIValidator,
  envVariablePathUIValidator,
  envVariableValueUIValidator,
  imageTypeUIValidator,
  languageUIValidator,
  portUIValidator,
  serviceNameUIValidator,
  tagsUIValidator,
  versionUIValidator,
  volumesUIValidator
} from "../infrastructure/validators/InputValidator";


test("no ports has been sent and return an error", () => {
  const initial = undefined;
  const actual = ["8080", "192.168.172.1"];
  expect(portUIValidator(initial)).toStrictEqual(requiredError);
});

test("a non used port as ip has been sent and return undefined", () => {
  const initial = "192.168.172.4:80";
  const actual = ["8080", "192.168.172.1"];
  expect(portUIValidator(initial)).toStrictEqual(undefined);
});

test("a non used port as string has been sent and return undefined", () => {
  const initial = "82";
  const actual = ["8080", "192.168.172.1"];
  expect(portUIValidator(initial)).toStrictEqual(undefined);
});

test("an env variable in uppercase has been sent and return undefined", () => {
  const initial = "ENV_VARIABLE_NAME";
  expect(envVariableNameUIValidator(initial)).toStrictEqual(undefined);
});

test("no env variable has been sent and return undefined", () => {
  const initial = "";
  expect(envVariableNameUIValidator(initial)).toStrictEqual(undefined);
});

test("an env variable in lowercase has been sent and return an error message", () => {
  const initial = "env_variable_name";
  expect(envVariableNameUIValidator(initial)).toStrictEqual(
    mustBeInUpperCaseError
  );
});

test("no env value has been sent and return an error message", () => {
  const initial = undefined;
  expect(envVariableValueUIValidator(initial)).toStrictEqual(requiredError);
});

test("an env value as int has been sent and return undefined", () => {
  const initial = 5679;
  expect(envVariableValueUIValidator(initial)).toStrictEqual(undefined);
});

test("an env value as string has been sent and return undefined", () => {
  const initial = "5679";
  expect(envVariableValueUIValidator(initial)).toStrictEqual(undefined);
});

test("a valid env path func has been sent and return undefined", () => {
  const initial = "C://test";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid env path func has been sent and return an error message", () => {
  const initial = "C://te?st.html";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(mustBePathError);
});

test("a valid env path func has been sent and return undefined", () => {
  const initial = "C://test/hello.html";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid env path func has been sent and return an error message", () => {
  const initial = "C:/hel**o";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(mustBePathError);
});

test("a correct service name has been sent and return undefined", () => {
  const initial = "Correct-Service_Name";
  expect(serviceNameUIValidator(initial)).toStrictEqual(undefined);
});

test("a service name with Special Character has been sent and return an error", () => {
  const initial = "UnCorr$ct-Service_Name";
  expect(serviceNameUIValidator(initial)).toStrictEqual(
    mustNotContainsSpecialCharactersExceptUnderscoreError
  );
});

test("a service name with white space has been sent and return an error", () => {
  const initial = "UnCorrect Service Name";
  expect(serviceNameUIValidator(initial)).toStrictEqual(
    mustNotContainsWhiteSpaceError
  );
});

test("a service name as int  has been sent and return an error", () => {
  const initial = 15066357;
  expect(serviceNameUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("no service name has been sent and return an error", () => {
  const initial = undefined;
  expect(serviceNameUIValidator(initial)).toStrictEqual(requiredError);
});

test("a container name with Special Character has been sent and return an error", () => {
  const initial = "UnCorr$ct-Container_Name";
  expect(containerNameUIValidator(initial)).toStrictEqual(
    mustNotContainsSpecialCharactersExceptUnderscoreError
  );
});

test("a container name with white space has been sent and return an error", () => {
  const initial = "UnCorrect Container Name";
  expect(containerNameUIValidator(initial)).toStrictEqual(
    mustNotContainsWhiteSpaceError
  );
});

test("a container name as int  has been sent and return an error", () => {
  const initial = 15066357;
  expect(containerNameUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("a correct Language name has been sent and return undefined", () => {
  const initial = "Correct-Language_name.with.dots";
  expect(languageUIValidator(initial)).toStrictEqual(undefined);
});

test("a Language name with Special Character has been sent and return an error", () => {
  const initial = "UnCorr$ct-Language_Name";
  expect(languageUIValidator(initial)).toStrictEqual(
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError
  );
});

test("a Language name with white space has been sent and return an error", () => {
  const initial = "UnCorrect Language Name";
  expect(languageUIValidator(initial)).toStrictEqual(
    mustNotContainsWhiteSpaceError
  );
});

test("a Language name as int  has been sent and return an error", () => {
  const initial = 15066357;
  expect(languageUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("no Language name has been sent and return an error", () => {
  const initial = undefined;
  expect(languageUIValidator(initial)).toStrictEqual(requiredError);
});

test("a image Language name has been sent and return undefined", () => {
  const initial = "Correct-Image_name.with.dots";
  expect(imageTypeUIValidator(initial)).toStrictEqual(undefined);
});

test("a image name with Special Character has been sent and return an error", () => {
  const initial = "UnCorr$ct-Image_Name";
  expect(imageTypeUIValidator(initial)).toStrictEqual(
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError
  );
});

test("a image name with white space has been sent and return an error", () => {
  const initial = "UnCorrect Image Name";
  expect(imageTypeUIValidator(initial)).toStrictEqual(
    mustNotContainsWhiteSpaceError
  );
});

test("a image name as int  has been sent and return an error", () => {
  const initial = 15066357;
  expect(imageTypeUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("no image name has been sent and return an error", () => {
  const initial = undefined;
  expect(imageTypeUIValidator(initial)).toStrictEqual(requiredError);
});

test("a correct version has been sent and return undefined", () => {
  const initial = "lts";
  expect(versionUIValidator(initial)).toStrictEqual(undefined);
});

test("a version with white space has been sent and return an error", () => {
  const initial = "UnCorrect version";
  expect(versionUIValidator(initial)).toStrictEqual(
    mustNotContainsWhiteSpaceError
  );
});

test("a version as int has been sent and return an error", () => {
  const initial = 15066357;
  expect(versionUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("a correct tag has been sent and return undefined", () => {
  const initial = "9.0.0";
  expect(tagsUIValidator(initial)).toStrictEqual(undefined);
});

test("a tag with white space has been sent and return an error", () => {
  const initial = "9 0 0";
  expect(tagsUIValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
});

test("a tag as int has been sent and return an error", () => {
  const initial = 15066357;
  expect(tagsUIValidator(initial)).toStrictEqual(mustBeStringError);
});

test("a valid volume path has been sent and return undefined", () => {
  const initial = "C://test";
  expect(volumesUIValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid volume path has been sent and return an error message", () => {
  const initial = "C://te?st.html";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(mustBePathError);
});

test("a valid volume path has been sent and return undefined", () => {
  const initial = "C://test/hello.html";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid volume path has been sent and return an error message", () => {
  const initial = "C:/hel**o";
  expect(envVariablePathUIValidator(initial)).toStrictEqual(mustBePathError);
});
