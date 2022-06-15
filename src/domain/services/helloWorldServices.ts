import { IExampleRepository, IExampleService } from "../ports/examplePorts";

interface Props {
  exampleRepository: IExampleRepository;
}

export const helloWorldService = ({
  exampleRepository,
}: Props): IExampleService => ({
  getHelloWorld: () => {
    return exampleRepository.createHelloWorld();
  },
});
