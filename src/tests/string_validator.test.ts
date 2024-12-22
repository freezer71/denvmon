import {readValueFromEnv} from "../core/validator";
import { DenvTypes, Primitive } from "../core/type";
import { InValidValue } from "../core/error";
describe("IsString validation",() => {
    it("Should validate a string", () => {
        const value = "test string";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.STRING,
            required: true,
        };
        expect(readValueFromEnv(dataType,value)).toBe(value);
    });

    it("Should throw `InValidValue` a error for empty string", async () => {
        const value = "";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.STRING,
            required: true,
            isEmptyAllow: false,
        };
        
        expect(() => readValueFromEnv(dataType,value)).toThrow(InValidValue);
    });
    
    it("Should throw `InValidValue` a error for length of string should be > than 10", async () => {
        const value = "1234";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.STRING,
            required: false,
            min: 10,
        };
        expect(()=>readValueFromEnv(dataType,value)).toThrow(InValidValue);
    });
    it("Should throw `InValidValue` a error for length of string should be < than 10", async () => {
        const value = "12345678910";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.STRING,
            required: false,
            max: 10,
        };
        expect(() => readValueFromEnv(dataType,value)).toThrow(InValidValue);
    });

    it("Should return default value", async () => {
        const defaultValue = "default value";
        const dataType: DenvTypes = {
            key: "KEY",
            type: Primitive.STRING,
            required: false,
            defaultValue,
        };
        expect(readValueFromEnv(dataType,undefined)).toBe(defaultValue);
    });
});