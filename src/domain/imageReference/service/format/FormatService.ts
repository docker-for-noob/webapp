import { IFormatService } from "../../ports/FormatPorts";
import { FormatRepository } from "../../../../infrastructure/repositories/FormatRepository";

const { dockerComposeToYaml } = FormatRepository;

const formatDockerCompose = (data) => {
  return dockerComposeToYaml(data);
};

export const FormatService: IFormatService = {
  formatDockerCompose,
};
