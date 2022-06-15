import { IExampleRepository } from "../../domain/ports/examplePorts";
import { Hello } from "../../domain/models/Hello";
import { HELLO_WORLD } from "../../domain/constants/strings";

export const helloWorldRepository = (): IExampleRepository => ({
  createHelloWorld(): Hello {
    return HELLO_WORLD;
  },
});
