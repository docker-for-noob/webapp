import {combineValidator, portValidator} from "../domain/utils/Validation/CombineValidators";
import {requiredError, valueMustBeUniqueError} from "../domain/utils/Validation/Strings";

test("Combine validator of Port must not trigger", () => {
    const actual = ["8080", "8081","8082"];
    const validator = combineValidator(portValidator(actual));
    const initial = "8079";
    const expected = undefined
    expect(validator(initial)).toStrictEqual(expected);
});

test("Combine validator of Port must trigger with same port error", () => {
    const actual = ["8080", "8081","8082"];
    const validator = combineValidator(portValidator(actual));
    const initial = "8080";
    expect(validator(initial)).toStrictEqual(valueMustBeUniqueError);
});

test("Combine validator of Port must trigger with required error", () => {
    const actual = ["8080", "8081","8082"];
    const validator = combineValidator(portValidator(actual));
    const initial = undefined;
    expect(validator(initial)).toStrictEqual(requiredError);
});
