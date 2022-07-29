import { ValidatorService } from "../core/domain/dockerCompose/service/validator/ValidatorService";

const { portMustBeUnique } = ValidatorService;

test("no ports has been sent and return an error", () => {
  const initial = "8080";
  const actual = ["8080", "192.168.172.1"];

  expect(portMustBeUnique(initial)).toStrictEqual(undefined);
});
