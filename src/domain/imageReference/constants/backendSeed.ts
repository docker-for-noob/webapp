import {
    container,
    containerName,
    DockerComposeVersion,
    Env,
    ImageName,
    Ports,
    restart,
    serviceName,
    Tag,
    Volumes
} from "./InputName";
import {DockerCompose} from "../models/DockerImage";

export const BackendSeed: DockerCompose = {
    [DockerComposeVersion]: "3.7",
    [container]: [
        {
            [serviceName]: "api",
            [containerName]: "api",
            [ImageName]: "golang",
            [Tag]: "latest",
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
            [Tag]: "latest",
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


