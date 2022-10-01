import {
    getError,
    getSuggest,
    isError,
    isSuggest, isWarning
} from "../core/application/commons/maybe/Maybe";
import {ValidatorService} from "../core/domain/dockerCompose/service/validator/ValidatorService";

const {
    isDefaultPort,
    hostPortMustBeUnique,
    ServiceNameNeedAnAlias,
    ensureDBRootEnvVariable
} = ValidatorService

test("default value was not changed and return a warning", () => {
    const defaultPort = [{host: "8080", container: "8080"}];

    const result = isDefaultPort(defaultPort)({host: "8080", container: "8080"})

    if (result) {
        expect(isSuggest(result)).toStrictEqual(true);
        expect(getSuggest(result)).toStrictEqual(`8080:8080 is a default port, its preferable to use a different port`);
    }
});

test("default value was not changed and return a warning", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"}
    ];

    const result = isDefaultPort(defaultPort)({host: "8080", container: "8080"})
    expect(result).toBeUndefined();
});


test("new ports arent used and return undefined", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"}
    ];

    const result = hostPortMustBeUnique(defaultPort)({host: "8080", container: "8080"})
    expect(result).toBeUndefined();
});


test("new host ports are use and return error", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"}
    ];

    const result = hostPortMustBeUnique(defaultPort)({host: "8081", container: "8080"})

    if (result) {
        expect(isError(result)).toStrictEqual(true);
        expect(getError(result)).toStrictEqual("The host port 8081 is already used");
    }
});

test("new container ports are use and return undefined", () => {
    const defaultPort = [
        {host: "8081", container: "8081"},
        {host: "8082", container: "8082"}
    ];

    const result = hostPortMustBeUnique(defaultPort)({host: "8080", container: "8082"})
    expect(result).toBeUndefined();
});


test("Service name is unique and return undefined", () => {
    const allServiceName = ["Service1", "Service2"];

    const result = ServiceNameNeedAnAlias(allServiceName)("Service3")

    expect(result).toBeUndefined()
});

test("Service name isnt  unique and return a warning", () => {
    const allServiceName = ["Service1", "Service2"];

    const result = ServiceNameNeedAnAlias(allServiceName)("Service1")

    if (result) {
        expect(isWarning(result)).toStrictEqual(true);
        expect(getError(result)).toStrictEqual("`The service Service1 must have an alias`");
    }});

test("Service name is the only service  unique and return undefined", () => {
    const result = ServiceNameNeedAnAlias()("Service1")

    expect(result).toBeUndefined()
});


test("Database Root username is default and return a warning", () => {
    const DbCredentials = {username:"root", password : "root"};

    const result = ensureDBRootEnvVariable(DbCredentials)

    if (result) {
        expect(isWarning(result)).toStrictEqual(true);
        expect(getError(result)).toStrictEqual("The Database Root Password is the default password, its it is preferable to change it");
    }});

