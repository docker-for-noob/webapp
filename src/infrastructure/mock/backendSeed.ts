import { DockerCompose } from "../../core/domain/dockerCompose/models/DockerImage";

export const BackendSeed: DockerCompose = {
  DockerComposeVersion: "3.7",
  Container: [
    {
      ServiceName: "api",
      ContainerName: "api",
      ImageName: "golang",
      Tag: "latest",
      Ports: [
        {
          host: "8080",
          container: "8080",
        },
      ],
      Volumes: [
        {
          host: "/",
          container: "/go/src/api/",
        },
      ],
    },
    {
      ServiceName: "Mongo",
      ContainerName: "Mongo",
      ImageName: "mongo",
      Restart: "always",
      Env: [
        {
          key: "MONGO_INITDB_ROOT_USERNAME",
          value: "root",
        },
        {
          key: "MONGO_INITDB_ROOT_PASSWORD",
          value: "example",
        },
      ],
    },
    {
      ServiceName: "mongo-express",
      ImageName: "mongo-express",
      Restart: "always",
      Ports: [
        {
          host: "8081",
          container: "8081",
        },
      ],
      Env: [
        {
          key: "ME_CONFIG_MONGODB_ADMINUSERNAME",
          value: "root",
        },
        {
          key: "ME_CONFIG_MONGODB_ADMINPASSWORD",
          value: "example",
        },
        {
          key: "ME_CONFIG_MONGODB_URL",
          value: "mongodb://root:example@mongo:27017/",
        },
      ],
    },
    {
      ServiceName: "redis",
      ImageName: "redislabs/redismod",
      Ports: [
        {
          host: "6379",
          container: "6379",
        },
      ],
    },
    {
      ServiceName: "redisinsight",
      ImageName: "redislabs/redismod",
      Tag: "latest",
      Ports: [
        {
          host: "8001",
          container: "8001",
        },
      ],
      Volumes: [
        {
          host: "/",
          container: "/db",
        },
      ],
    },
  ],
};
