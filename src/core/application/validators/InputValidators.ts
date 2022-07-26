import {portUIValidator} from "../../../infrastructure/validators/InputValidator";
import {ValidatorService} from "../../domain/dockerCompose/service/validator/ValidatorService";
import {combineValidator} from "./CombineValidators";


const {portMustBeUnique} = ValidatorService;

const PortsValidator = (value: string) =>
    combineValidator(portUIValidator, portMustBeUnique)(value);