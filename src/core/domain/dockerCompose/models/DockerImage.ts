export type HostContainer<T> = {
  host: T;
  container: T;
};
export type kvp<T> = {
  key: string;
  value: T;
};

export type port = HostContainer<string>;
export type volumes = HostContainer<string>;
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
