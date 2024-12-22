import { InValidValue, NotFoundError } from "./error";
import { DenvTypes, Primitive, PrimitiveBoolean, PrimitiveNumber, PrimitiveString } from "./type";

const validateStringFromEnv = (data:PrimitiveString,key:string,value?:string) => {
    if(value === undefined){
      return data.defaultValue;
    }
    if(value === "" && !data.isEmptyAllow){
      throw new InValidValue(key, value,"Empty value is not allowed");
    }
    if(data.max && value.length > data.max){
      throw new InValidValue(key, value,`Value should be less than ${data.max}`);
    }
    if(data.min && value.length < data.min){
      throw new InValidValue(key, value,`Value should be greater than ${data.min}`);
    }
    return value;
}

const validateNumberFromEnv = (data: PrimitiveNumber,key:string,value?:string) => {
    if(value === undefined){
      return data.defaultValue;
    }
    const parsedValue = Number(value);
    if (!parsedValue) {
      throw new InValidValue(key, value);
    }
    if(data.isNegativeAllow === false && parsedValue < 0){
      throw new InValidValue(key, value,"Negative value is not allowed");
    }
    if(data.isInt && parseFloat(value) !== parseInt(value)){
      throw new InValidValue(key, value,"Value should be integer");
    }
    return parsedValue;
}

const validateBooleanFromEnv = (data: PrimitiveBoolean,key:string,value?:string) => {
  if(value === undefined){
    return data.defaultValue;
  }
  value = value.toLowerCase();
  if(!data.types.includes(value)){
    throw new InValidValue(key, value,`Value should be one of ${data.types}`);
  }
  return data.types[0] === value;
}

/**
 * 
 * @param data {DenvTypes}
 * @param value {string?} only for testing
 * @returns 
 */
export const readValueFromEnv = (data: DenvTypes,value?:string) => {
    const envKey = data.key.toUpperCase();
    const envValue = process.env[envKey] || value;
    
    if (envValue === undefined && data.required) {
      throw new NotFoundError(envKey);
    }
    switch(data.type){
      case Primitive.STRING:
        return validateStringFromEnv(data,envKey,envValue);
      case Primitive.NUMBER:
        return validateNumberFromEnv(data,envKey,envValue);
      case Primitive.BOOLEAN:
        return validateBooleanFromEnv(data,envKey,envValue);
      default: 
        throw new Error("Invalid type");
    }
  };