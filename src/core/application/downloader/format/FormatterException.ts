import {error, Error} from "../../commons/maybe/Maybe";
import {ApplicationException} from "../../commons/exception/exception";

const noContainerFoundError: Error<ApplicationException> = error(
    "No container found"
);

export {
    noContainerFoundError
};