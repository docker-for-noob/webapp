import { HelloWorldRepository } from "../../infrastructure/repositories/helloWorldRepository";
import { IExampleService } from "../ports/examplePorts";

export class HelloWorldService implements IExampleService {
  exampleRepository: HelloWorldRepository;

  constructor(exampleRepository: HelloWorldRepository) {
    this.exampleRepository = exampleRepository;
  }

  getHelloWorld(): string {
    return this.exampleRepository.createHelloWorld();
  }
}
