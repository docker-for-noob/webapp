import {
  DockerContainer,
  env,
  InternalExternal,
} from "../../../domain/dockerCompose/models/DockerImage";

const formatImageName = (data: DockerContainer): string => {
  if (data.Tag != undefined) return [data.ImageName, data.Tag].join(":");
  return data.ImageName;
};
const formatIEArrayToStringArray = <T>(
  data?: InternalExternal<T>[]
): string[] | undefined => data?.map(formatPrimitiveIEToString<T>);
const formatPrimitiveIEToString = <T>(e: InternalExternal<T>): string =>
  [e.internal, e.external].join(":");

const formatEnvVarToKVPObject = (data?: env[]): any =>
  data && {
    ...data?.reduce((acc, env) => {
      acc[env.key] = env.value;
      return acc;
    }, {}),
  };

export {
  formatImageName,
  formatEnvVarToKVPObject,
  formatIEArrayToStringArray,
  formatPrimitiveIEToString,
};
