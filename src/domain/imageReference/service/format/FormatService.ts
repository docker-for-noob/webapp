import { IFormatService } from "../../ports/FormatPorts";
import { FormatRepository } from "../../../../infrastructure/repositories/FormatRepository";

const { toYaml } = FormatRepository;

const formatDockerCompose = (data) => {
  return toYaml(data);
};

export const FormatService: IFormatService = {
  formatDockerCompose,
};
