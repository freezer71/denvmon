import {readValueFromEnv} from "../core/validator";
import { DenvTypes, Primitive } from "../core/type";
import { InValidValue } from "../core/error";

describe("IsBoolean validation",() => {
    it("Should validate a boolean", () => {
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.BOOLEAN,
            required: true,
            types: ["true","false"],
        };
        expect(readValueFromEnv(dataType,"true")).toBe(true);
        expect(readValueFromEnv(dataType,"false")).toBe(false);
    });

    it("Should validate a boolean with custom values (yes,no)", () => {
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.BOOLEAN,
            required: true,
            types: ["yes","no"],
        };
        expect(readValueFromEnv(dataType,"yes")).toBe(true);
        expect(readValueFromEnv(dataType,"no")).toBe(false);
    });
    it("Should throw `InValidValue` a error for values with invalid types", () => {
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.BOOLEAN,
            required: true,
            types: ["yes","no"],
        };
        expect(()=>readValueFromEnv(dataType,"true")).toThrow(InValidValue);
        expect(()=>readValueFromEnv(dataType,"false")).toThrow(InValidValue);
    });
    it("Should return default value", () => {
        const defaultValue = true;
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.BOOLEAN,
            required: false,
            defaultValue,
            types: ["yes","no"],
        };
        expect(readValueFromEnv(dataType)).toBe(defaultValue)
    });
});