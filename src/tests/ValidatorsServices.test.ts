import {
    getError,
    getSuggest,
    getWarning,
    isError,
    isSuggest,
    isWarning,
} from "../core/application/commons/maybe/Maybe";
import {ValidatorService} from "../core/domain/dockerCompose/service/validator/ValidatorService";
import {env, volumes} from "../core/domain/dockerCompose/models/DockerImage";
import {Validator} from "../core/application/validators/type/type";
import {
    containerPathMustBeInput,
    hostPathMustBeInput,
    keyMustBeInput,
    valueMustBeInput
} from "../core/domain/dockerCompose/service/validator/ValidatorException";

const {
    isDefaultPort,
    hostPortMustBeUnique,
    ServiceNameNeedAnAlias,
    EnvValueMustBeRelateToKey,
    EnvKeyMustBeRelateToValue,
    VolumeHostMustBeRelateToContainer,
    VolumeContainerMustBeRelateToHost,
    IsServiceUnique,
} = ValidatorService;

test("Service is unique and return true", () => {
    const actual = "test";
    const usedService = ["test1", "test2"];

    const result = IsServiceUnique(actual)(usedService);
    expect(result).toStrictEqual(true);
});

test("Service is not unique and return false", () => {
    const actual = "test1";
    const usedService = ["test1", "test2"];

    const result = IsServiceUnique(actual)(usedService);
    expect(result).toStrictEqual(false);
});

test("default value was not changed and return a warning", () => {
    const defaultPort = [{host: "8080", container: "8080"}];

    const result = isDefaultPort(defaultPort)({
        host: "8080",
        container: "8080",
    });
    expect(isSuggest(result!)).toStrictEqual(true);
    expect(getSuggest(result!)).toStrictEqual(
        `8080:8080 est le port par default, il est préférable de le modifier`
    );
});

test("default value was not changed and return a warning", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"},
    ];

    const result = isDefaultPort(defaultPort)({
        host: "8080",
        container: "8080",
    });
    expect(result).toBeUndefined();
});

test("new ports arent used and return undefined", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"},
    ];

    const result = hostPortMustBeUnique(defaultPort)({
        host: "8080",
        container: "8080",
    });
    expect(result).toBeUndefined();
});

test("new host ports are use and return error", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"},
    ];

    const result = hostPortMustBeUnique(defaultPort)({
        host: "8081",
        container: "8080",
    });

    expect(isError(result!)).toStrictEqual(true);
    expect(getError(result!)).toStrictEqual(
        "Le port Host :  8081 est déjà utilisé"
    );
});

test("new container ports are use and return undefined", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"},
    ];

    const result = hostPortMustBeUnique(defaultPort)({
        host: "8080",
        container: "8082",
    });
    expect(result).toBeUndefined();
});

test("Service name is unique and return undefined", () => {
    const allServiceName = ["Service1", "Service2"];

    const result = ServiceNameNeedAnAlias(allServiceName)("Service3");
    expect(result).toBeUndefined();
});

test("Service name isnt  unique and return a warning", () => {
    const allServiceName = ["Service1", "Service2"];

    const result = ServiceNameNeedAnAlias(allServiceName)("Service1");
    expect(isWarning(result!)).toStrictEqual(true);
    expect(getWarning(result!)).toStrictEqual(
        "le service : Service1 doit avoir un alias"
    );
});

test("Service name is the only service  unique and return undefined", () => {
    const result = ServiceNameNeedAnAlias()("Service1");
    expect(result).toBeUndefined();
});


test("env kvp contain 2 empty string and return undefined", () => {
    const emptyEnv: env = {key: "", value: ""};

    const result = EnvValueMustBeRelateToKey(emptyEnv)(emptyEnv.value);
    expect(result).toBeUndefined();
});

test("env kvp contain a key and an empty value and return error in value input", () => {
    const emptyEnv: env = {key: "gsdgs", value: ""};

    const result = EnvValueMustBeRelateToKey(emptyEnv)(emptyEnv.value);

    expect(isError(result!)).toStrictEqual(true);
    expect(getError(result!)).toStrictEqual("Une valeur doit être saisie");
});

test("env kvp contain a key empty string and return undefined", () => {
    const emptyEnv: env = {key: "", value: ""};

    const result = EnvKeyMustBeRelateToValue(emptyEnv)(emptyEnv.key);
    expect(result).toBeUndefined();
});

test("env kvp contain a value and an empty key and return error in key input", () => {
    const emptyEnv: env = {key: "", value: "dgsdg"};

    const result = EnvKeyMustBeRelateToValue(emptyEnv)(emptyEnv.key);

    expect(isError(result!)).toStrictEqual(true);
    expect(getError(result!)).toStrictEqual("Une clé doit être saisie");
});



test("volume kvp contain 2 empty string and return undefined", () => {
    const emptyEnv: volumes = {host: "", container: ""};

    const result = VolumeContainerMustBeRelateToHost(emptyEnv)(emptyEnv.container);
    expect(result).toBeUndefined();
});

test("volume kvp contain a key and an empty value and return error in value input", () => {
    const emptyEnv: volumes = {host: "gsdgs", container: ""};

    const result = VolumeContainerMustBeRelateToHost(emptyEnv)(emptyEnv.container);

    expect(isError(result!)).toStrictEqual(true);
    expect(getError(result!)).toStrictEqual("Un chemin container doit être saisie");
});

test("volume kvp contain a key empty string and return undefined", () => {
    const emptyEnv: volumes = {host: "", container: ""};

    const result = VolumeHostMustBeRelateToContainer(emptyEnv)(emptyEnv.host);
    expect(result).toBeUndefined();
});

test("volume kvp contain a value and an empty key and return error in key input", () => {
    const emptyEnv: volumes = {host: "", container: "dgsdg"};

    const result = VolumeHostMustBeRelateToContainer(emptyEnv)(emptyEnv.host);

    expect(isError(result!)).toStrictEqual(true);
    expect(getError(result!)).toStrictEqual("Un chemin host doit être saisie");
});
