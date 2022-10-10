import { NetworkingService } from "../core/domain/dockerCompose/service/networking/NetworkingService";

const { generateNewHostPort } = NetworkingService;

test("actual ports is already used and increment host port by 2", () => {
  const usedPorts = [
    { host: "3067", container: "3067" },
    { host: "8081", container: "8081" },
    { host: "8082", container: "8082" },
  ];
  const actualPorts = { host: "8081", container: "8081" };

  const result = generateNewHostPort(actualPorts)(usedPorts);
  expect(result).toEqual({ host: "8083", container: "8081" });
});

test("actual ports is already used and increment host port by 4", () => {
  const usedPorts = [
    { host: "8081", container: "8081" },
    { host: "8082", container: "8082" },
    { host: "8083", container: "8082" },
    { host: "8084", container: "8082" },
  ];
  const actualPorts = { host: "8081", container: "8081" };

  const result = generateNewHostPort(actualPorts)(usedPorts);
  expect(result).toEqual({ host: "8085", container: "8081" });
});

test("actual ports is already used and the increment reach the max range, Return the Host as the Min range if he is allowed", () => {
  const usedPorts = [
    { host: "8081", container: "8081" },
    { host: "8082", container: "8082" },
    { host: "65535", container: "8082" },
  ];
  const actualPorts = { host: "65535", container: "8081" };

  const result = generateNewHostPort(actualPorts)(usedPorts);
  expect(result).toEqual({ host: "1023", container: "8081" });
});

test("default value is an IP but the port is already used, return IP with incremented ports", () => {
  const usedPorts = [
    { host: "5000", container: "8081" },
    { host: "8082", container: "8082" },
    { host: "65535", container: "8082" },
  ];
  const actualPorts = { host: "127.192.1.1:5000", container: "8081" };

  const result = generateNewHostPort(actualPorts)(usedPorts);
  expect(result).toEqual({ host: "127.192.1.1:5001", container: "8081" });
});
