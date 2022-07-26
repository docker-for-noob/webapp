export type InternalExternal<T> = {
  internal: T;
  external: T;
};
export type kvp<T> = {
  key: string;
  value: T;
};

export type port = InternalExternal<string>;
export type volumes = InternalExternal<string>;
export type env = kvp<string>;
export type envArray = env[] | undefined;

export type DockerCompose = {
  DockerComposeVersion: string;
  Container: DockerContainer[];
};

export type DockerContainer = {
  ServiceName: string;
  ContainerName?: string;
  Restart?: string;
  ImageName: string;
  Tag?: string;
  Ports?: port[];
  Volumes?: volumes[];
  Link?: string[];
  Env?: envArray;
};
