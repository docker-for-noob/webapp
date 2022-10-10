import { HostContainer, port } from "../models/DockerImage";

export interface INetworkingServices {
  generateNewHostPort: (
    actual: HostContainer<string>
  ) => (UsedPorts?: HostContainer<string>[]) => port;
}
