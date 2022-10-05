import { DockerHubRequest } from "./requestParams";

const DockerImageArea = "dockerImage";
const ImageReferenceArea = "reference";

export const populateImagesEndpoint = `${DockerImageArea}/images`;
export const populateVersionEndpoint = (image: string) =>
  `${DockerImageArea}/versions/${image}`;
export const getAllTagsFromImageVersion = ({
  image,
  version,
}: DockerHubRequest) => `${DockerImageArea}/tags/${image}/${version}`;

export const GetImageReference = (image: string) =>
  `${ImageReferenceArea}/${image}`;
