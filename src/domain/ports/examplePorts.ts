import { Hello } from "../models/Hello";

export interface IExampleRepository {
  createHelloWorld: () => Hello;
}

export interface IExampleService {
  getHelloWorld: () => Hello;
}
