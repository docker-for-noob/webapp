import {
    mustBeInUpperCaseError,
    mustBePathError,
    mustBeStringError,
    mustNotContainsSpecialCharactersExceptUnderscoreError,
    mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError,
    mustNotContainsWhiteSpaceError,
    requiredError,
    valueMustBeUniqueError
} from "../domain/imageReference/constants/Strings";
import {validatorService} from "../domain/imageReference/service/Validator/ValidatorService";


const {
    portsValidator,
    envVariableNameValidator,
    envVariableValueValidator,
    envVariablePathValidator,
    serviceNameValidator,
    containerNameValidator,
    languageValidator,
    imageTypeValidator,
    versionValidator,
    tagsValidator,
    volumesValidator,
} = validatorService

test("An used ports in string has been sent and return an error", () => {
    const initial = "8080";
    const actual = ["8080", "192.168.172.1"]
    expect(portsValidator(actual)(initial)).toStrictEqual(valueMustBeUniqueError);
});

test("An used ports in path has been sent and return an error", () => {
    const initial = "192.168.172.1";
    const actual = ["8080", "192.168.172.1"]
    expect(portsValidator(actual)(initial)).toStrictEqual(valueMustBeUniqueError);
});

test("no ports has been sent and return an error", () => {
    const initial = undefined;
    const actual = ["8080", "192.168.172.1"]
    expect(portsValidator(actual)(initial)).toStrictEqual(requiredError);
});

test("a non used port as ip has been sent and return undefined", () => {
    const initial = "192.168.172.4:80";
    const actual = ["8080", "192.168.172.1"]
    expect(portsValidator(actual)(initial)).toStrictEqual(undefined);
});

test("a non used port as string has been sent and return undefined", () => {
    const initial = "82";
    const actual = ["8080", "192.168.172.1"]
    expect(portsValidator(actual)(initial)).toStrictEqual(undefined);
});

test("an env variable in uppercase has been sent and return undefined", () => {
    const initial = "ENV_VARIABLE_NAME";
    expect(envVariableNameValidator(initial)).toStrictEqual(undefined);
});

test("no env variable has been sent and return undefined", () => {
    const initial = "";
    expect(envVariableNameValidator(initial)).toStrictEqual(undefined);
});

test("an env variable in lowercase has been sent and return an error message", () => {
    const initial = "env_variable_name";
    expect(envVariableNameValidator(initial)).toStrictEqual(mustBeInUpperCaseError);
});

test("no env value has been sent and return an error message", () => {
    const initial = undefined;
    expect(envVariableValueValidator(initial)).toStrictEqual(requiredError);
});

test("an env value as int has been sent and return undefined", () => {
    const initial = 5679;
    expect(envVariableValueValidator(initial)).toStrictEqual(undefined);
});

test("an env value as string has been sent and return undefined", () => {
    const initial = "5679";
    expect(envVariableValueValidator(initial)).toStrictEqual(undefined);
});

test("a valid env path func has been sent and return undefined", () => {
    const initial = "C://test";
    expect(envVariablePathValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid env path func has been sent and return an error message", () => {
    const initial = "C://te?st.html";
    expect(envVariablePathValidator(initial)).toStrictEqual(mustBePathError);
});

test("a valid env path func has been sent and return undefined", () => {
    const initial = "C://test/hello.html";
    expect(envVariablePathValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid env path func has been sent and return an error message", () => {
    const initial = "C:/hel**o";
    expect(envVariablePathValidator(initial)).toStrictEqual(mustBePathError);
})

test("a correct service name has been sent and return undefined", () => {
    const initial = "Correct-Service_Name";
    expect(serviceNameValidator(initial)).toStrictEqual(undefined);
})

test("a service name with Special Character has been sent and return an error", () => {
    const initial = "UnCorr$ct-Service_Name";
    expect(serviceNameValidator(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptUnderscoreError);
})

test("a service name with white space has been sent and return an error", () => {
    const initial = "UnCorrect Service Name";
    expect(serviceNameValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a service name as int  has been sent and return an error", () => {
    const initial = 15066357;
    expect(serviceNameValidator(initial)).toStrictEqual(mustBeStringError);
})

test("no service name has been sent and return an error", () => {
    const initial = undefined;
    expect(serviceNameValidator(initial)).toStrictEqual(requiredError);
})

test("a container name with Special Character has been sent and return an error", () => {
    const initial = "UnCorr$ct-Container_Name";
    expect(containerNameValidator(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptUnderscoreError);
})

test("a container name with white space has been sent and return an error", () => {
    const initial = "UnCorrect Container Name";
    expect(containerNameValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a container name as int  has been sent and return an error", () => {
    const initial = 15066357;
    expect(containerNameValidator(initial)).toStrictEqual(mustBeStringError);
})

test("a correct Language name has been sent and return undefined", () => {
    const initial = "Correct-Language_name.with.dots";
    expect(languageValidator(initial)).toStrictEqual(undefined);
})

test("a Language name with Special Character has been sent and return an error", () => {
    const initial = "UnCorr$ct-Language_Name";
    expect(languageValidator(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError);
})

test("a Language name with white space has been sent and return an error", () => {
    const initial = "UnCorrect Language Name";
    expect(languageValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a Language name as int  has been sent and return an error", () => {
    const initial = 15066357;
    expect(languageValidator(initial)).toStrictEqual(mustBeStringError);
})

test("no Language name has been sent and return an error", () => {
    const initial = undefined;
    expect(languageValidator(initial)).toStrictEqual(requiredError);
})

test("a image Language name has been sent and return undefined", () => {
    const initial = "Correct-Image_name.with.dots";
    expect(imageTypeValidator(initial)).toStrictEqual(undefined);
})

test("a image name with Special Character has been sent and return an error", () => {
    const initial = "UnCorr$ct-Image_Name";
    expect(imageTypeValidator(initial)).toStrictEqual(mustNotContainsSpecialCharactersExceptUnderscoreSlashAndPointError);
})

test("a image name with white space has been sent and return an error", () => {
    const initial = "UnCorrect Image Name";
    expect(imageTypeValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a image name as int  has been sent and return an error", () => {
    const initial = 15066357;
    expect(imageTypeValidator(initial)).toStrictEqual(mustBeStringError);
})

test("no image name has been sent and return an error", () => {
    const initial = undefined;
    expect(imageTypeValidator(initial)).toStrictEqual(requiredError);
})

test("a correct version has been sent and return undefined", () => {
    const initial = "lts";
    expect(versionValidator(initial)).toStrictEqual(undefined);
})

test("a version with white space has been sent and return an error", () => {
    const initial = "UnCorrect version";
    expect(versionValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a version as int has been sent and return an error", () => {
    const initial = 15066357;
    expect(versionValidator(initial)).toStrictEqual(mustBeStringError);
})


test("a correct tag has been sent and return undefined", () => {
    const initial = "9.0.0";
    expect(tagsValidator(initial)).toStrictEqual(undefined);
})

test("a tag with white space has been sent and return an error", () => {
    const initial = "9 0 0";
    expect(tagsValidator(initial)).toStrictEqual(mustNotContainsWhiteSpaceError);
})

test("a tag as int has been sent and return an error", () => {
    const initial = 15066357;
    expect(tagsValidator(initial)).toStrictEqual(mustBeStringError);
})

test("a valid volume path has been sent and return undefined", () => {
    const initial = "C://test";
    expect(volumesValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid volume path has been sent and return an error message", () => {
    const initial = "C://te?st.html";
    expect(envVariablePathValidator(initial)).toStrictEqual(mustBePathError);
});

test("a valid volume path has been sent and return undefined", () => {
    const initial = "C://test/hello.html";
    expect(envVariablePathValidator(initial)).toStrictEqual(undefined);
});

test("an unvalid volume path has been sent and return an error message", () => {
    const initial = "C:/hel**o";
    expect(envVariablePathValidator(initial)).toStrictEqual(mustBePathError);
})
