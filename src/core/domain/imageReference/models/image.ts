export type ImageType = "APP" | "DB" | "ADMINER" | "OTHER" | "";

export type ImageReference = {
  id: string;
  name: string;
  type?: ImageType;
  workdir?: string[];
  port?: number[];
  env?: Env[];
};

export type Env = {
  key: string;
  description: string;
};
