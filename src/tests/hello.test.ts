import { helloWorldService } from "../domain/services/helloWorldServices";
import { helloWorldRepository } from "../infrastructure/repositories/helloWorldRepository";

test("its an hello world", () => {
  const service = helloWorldService({
    exampleRepository: helloWorldRepository(),
  });
  expect(service.getHelloWorld()).toBe("Hello World");
});
