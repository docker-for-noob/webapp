import {helloWorldService} from "../domain/services/helloWorldServices";

test("its an hello world", ()=> {
  expect(helloWorldService.getHelloWorld()).toBe("Hello World");
})