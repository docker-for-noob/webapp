import {IExampleRepository} from "../../domain/ports/examplePorts";
import {Hello} from "../../domain/models/Hello";

export const helloWorldRepository = (): IExampleRepository => ({
    createHelloWorld(): Hello {
        return "Hello World";
    }
});
