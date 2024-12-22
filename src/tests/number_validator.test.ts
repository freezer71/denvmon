import {readValueFromEnv} from "../core/validator";
import { DenvTypes, Primitive } from "../core/type";
import { InValidValue } from "../core/error";

describe("IsNumber validation",() => {
    it("Should validate a int", () => {
        const value = "123";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.NUMBER,
            required: true,
            isInt: true
        };
        expect(readValueFromEnv(dataType,value)).toBe(Number(value));
    });
    it("Should validate a float", () => {
        const value = "123.4";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.NUMBER,
            required: true,
        };
        
        expect(readValueFromEnv(dataType,value)).toBe(Number(value));
    });
    it("Should throw `InValidValue` a error for a char", () => {
        const value = "f";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.NUMBER,
            required: true,
        };
        expect(() => readValueFromEnv(dataType,value)).toThrow(InValidValue);
    });
    it("Should throw `InValidValue` for a float validation", () => {
        const value = "1,5";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.NUMBER,
            required: true,
            isInt: true,
        };
        expect(() => readValueFromEnv(dataType,value)).toThrow(InValidValue);
    });
});