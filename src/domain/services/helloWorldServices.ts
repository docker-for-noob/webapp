import {IExampleRepository, IExampleService} from "../ports/examplePorts";
import {helloWorldRepository} from "../../infrastructure/repositories/helloWorldRepository";


const repository: IExampleRepository = helloWorldRepository();

   const  getHelloWorld =() => {
        return repository.createHelloWorld();
    };

export const helloWorldService: IExampleService = {
    getHelloWorld
};





