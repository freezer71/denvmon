import "reflect-metadata";
import {  DenvTypes, Primitive } from "./type";
import { InValidValue, NotFoundError } from "./error";
import * as dotenv from "dotenv";
import { readValueFromEnv } from "./validator";

/**
 * 
 * @param envPath {string|null} - path to the env file by default it will take the root path if envPath is null then it will not load the env file
 * @returns class decorator 
 */
export const Denvmon = (envPath?: string | null )=>{
  return (target: any) => {
    return class extends target{
      constructor(...args: any[]) {
        super(...args);
        if(envPath !== null){
          dotenv.config({
            path: envPath
          });
        }
        const metadataKeys = Reflect.getMetadataKeys(this);
        for (const metadataKey of metadataKeys) {
          const metadata: DenvTypes = Reflect.getMetadata(metadataKey, this);
          this[metadataKey] = readValueFromEnv(metadata);
        }
        Object.freeze(this);
      }
    } as any;
  };
}