import { DockerContainer, InternalExternal } from "../../models/DockerImage";
import { Env, ImageName, Tag } from "../../constants/InputName";

const formatImageName = (data: DockerContainer): string => {
  if (data[Tag] != undefined) return [data[ImageName], data[Tag]].join(":");
  return data[ImageName];
};

const formatIEToStringArray = <T>(
  data?: InternalExternal<T>[]
): string[] | undefined => data?.map(formatIEToString<T>);
const formatIEToString = <T>(e: InternalExternal<T>): string =>
  [e.internal, e.external].join(":");

const formatEnvVarToKVPObject = (data: DockerContainer): any =>
  data[Env] && {
    ...data[Env]?.reduce((acc, env) => {
      acc[env.key] = env.value;
      return acc;
    }, {}),
  };

export { formatImageName, formatEnvVarToKVPObject, formatIEToStringArray };
