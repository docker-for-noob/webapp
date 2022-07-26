import { InfrastructureException } from "../../core/application/commons/exception/exception";

const BLOB_IS_EMPTY: InfrastructureException = "Blob is empty";
const BLOB_IS_NOT_A_VALID_TYPE = (
  filename: string
): InfrastructureException => `${filename} is not a valid file type`;
const DATA_IS_EMPTY: InfrastructureException = "Data is empty";

export {
    BLOB_IS_EMPTY,
    BLOB_IS_NOT_A_VALID_TYPE,
    DATA_IS_EMPTY
};
