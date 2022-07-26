import { DownloaderDependency } from "../../../infrastructure/download/DownloaderDependency";
import { TypeApplicationYaml } from "../../../infrastructure/download/FIleType";
import { getResult, isError, Maybe } from "../commons/maybe/Maybe";
import { DockerCompose } from "../../domain/dockerCompose/models/DockerImage";
import { formatDockerComposeToYaml } from "./format/Formatter";
import { Document } from "yaml";

const { inBrowser: proceedDownloadInBrowser } = DownloaderDependency;

const downloadDockerCompose = async (
  filename: string,
  data: DockerCompose
): Promise<Maybe<Document>> => {
  const FormattedYaml: Maybe<Document> = await formatDockerComposeToYaml(data);

  if (isError<Document>(FormattedYaml)) return FormattedYaml;

  return proceedDownloadInBrowser(
    filename,
    getResult(FormattedYaml),
    TypeApplicationYaml
  );
};

export { downloadDockerCompose };
