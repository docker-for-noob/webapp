import YAML from "yaml";

export interface IFormatService {
    formatDockerCompose: (imageReference: string) => string
}

export interface IFormatRepository {
    toYaml: (data: any) => string
}