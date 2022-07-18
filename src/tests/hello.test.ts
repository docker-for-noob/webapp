import { HelloWorldService } from "../domain/services/helloWorldServices";
import { HelloWorldRepository } from "../infrastructure/repositories/helloWorldRepository";

test("its an hello world", () => {
  const service = new HelloWorldService(new HelloWorldRepository());
  expect(service.getHelloWorld()).toBe("Hello World");
});
