export type PopulateImageDTO = {
  Images: string[];
};
export type VersionsFromImageDTO = {
  Name: string;
  Versions: string[];
};

export type TagsFromImageVersionDTO = {
  Name: string;
  Language: string;
  Version: string;
  Tags: string[];
};

export type ImageReferenceDTO = {
  Name: string;
  Workdir: string[];
  Port: string[];
  Env: {
    Key: string;
    Desc: string;
  }[];
};
