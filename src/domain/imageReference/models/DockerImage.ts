import {
    container,
    containerName,
    DockerComposeVersion,
    Env,
    ImageName,
    Link,
    Ports,
    restart,
    serviceName,
    Tag,
    Volumes
} from "../constants/InputName"

export type InternalExternal<T> = {
    external: T,
    internal: T
}
type kvp<T> = {
    key: string,
    value: T
}

export type port = InternalExternal<string>
type volumes = InternalExternal<string>
type env = kvp<string>

export type DockerCompose = {
    [DockerComposeVersion]: string,
    [container]: DockerContainer[],
}

export type DockerContainer = {
    [serviceName]: string,
    [containerName]?: string;
    [restart]?: string,
    [ImageName]: string;
    [Tag]?: string;
    [Ports]?: port[];
    [Volumes]?: volumes[];
    [Link]?: string[];
    [Env]?: env[];
};
