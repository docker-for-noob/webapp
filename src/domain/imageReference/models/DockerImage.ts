export const DockerComposeVersion = "DockerComposeVersion";
export const serviceName = "serviceName";
export const container = "container";
export const containerName = "containerName";
export const ImageName = "name"
export const Tag = "Tag"
export const Version = "version"
export const Ports = "ports"
export const Volumes = "volumes"
export const Link = "link"
export const Env = "env"
export const restart = "restart"

type InternalExternal<T> = {
    external: T,
    internal: T
}
type kvp<T> = {
    key: string,
    value: T
}

type port = InternalExternal<string>
type volumes = InternalExternal<string>
type env = kvp<string>

export type DockerCompose = {
    [DockerComposeVersion]: string,
    [container]: DockerContainer[],
}

type DockerContainer = {
    [serviceName]: string,
    [containerName]?: string;
    [restart]?: string,
    [ImageName]: string;
    [Tag]?: string[];
    [Version]?: string;
    [Ports]?: port[];
    [Volumes]?: volumes[];
    [Link]?: string[];
    [Env]?: env[];
};

export const BackendSeed: DockerCompose = {
    [DockerComposeVersion]: "3.7",
    [container]: [
        {
            [serviceName]: "api",
            [containerName]: "api",
            [ImageName]: "golang",
            [Tag]: ["latest"],
            [Version]: "1.14",
            [Ports]: [{
                external: "8080",
                internal: "8080"
            }],
            [Volumes]: [{
                internal: "/",
                external: "/go/src/api/",
            }],
        },
        {
            [serviceName]: "Mongo",
            [containerName]: "Mongo",
            [ImageName]: "mongo",
            [restart]: "always",
            [Env]: [{
                key: "MONGO_INITDB_ROOT_USERNAME",
                value: "root"
            },
                {
                    key: "MONGO_INITDB_ROOT_PASSWORD",
                    value: "example"
                }],
        },
        {
            [serviceName]: "mongo-express",
            [ImageName]: "mongo-express",
            [restart]: "always",
            [Ports]: [{
                external: "8081",
                internal: "8081"
            }],
            [Env]: [
                {
                    key: "ME_CONFIG_MONGODB_ADMINUSERNAME",
                    value: "root"
                },
                {
                    key: "ME_CONFIG_MONGODB_ADMINPASSWORD",
                    value: "example"
                },
                {
                    key: "ME_CONFIG_MONGODB_URL",
                    value: "mongodb://root:example@mongo:27017/"
                }
            ],
        }, {
            [serviceName]: "redis",
            [ImageName]: "redislabs/redismod",
            [Ports]: [{
                external: "6379",
                internal: "6379"
            }],
        }, {
            [serviceName]: "redisinsight",
            [ImageName]: "redislabs/redismod",
            [Version]: "latest",
            [Ports]: [{
                external: "8001",
                internal: "8001"
            }],
            [Volumes]: [{
                internal: "/",
                external: "/db"
            }],

        }],
}


