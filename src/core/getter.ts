import { DenvType, Primitive } from "./type";
import "reflect-metadata";

type GetterProps<T extends Primitive> = Omit<Partial<DenvType<T>>, "type" | "key">;

export const IsString = (
  key: string,
  data?: GetterProps<Primitive.STRING>,
) => {
  const {  required = true, ...rest } = data || {};
  return (target: Object, keyName: string) => {
    
    const metadata: DenvType<Primitive.STRING> = {
      type: Primitive.STRING,
      key,
      required,
      ...rest,
    };
    Reflect.defineMetadata(keyName, metadata, target);
  };
};

export const IsBoolean = (
  key: string,
  data?: GetterProps<Primitive.BOOLEAN>,
) => {
  const { required = true,types = ["true", "false"], ...rest } = data || {};
  return (target: Object, keyName: string) => {
    const metadata: DenvType<Primitive.BOOLEAN> = {
      type: Primitive.BOOLEAN,
      key,
      required,
      types,
      ...rest
    };
    Reflect.defineMetadata(keyName, metadata, target);
  };
};
export const IsNumber = (
  key: string,
  data?: GetterProps<Primitive.NUMBER>,
) => {
  const { 
    required = true,
    ...rest
  } = data || {};
  return (target: Object, keyName: string) => {
    const metadata: DenvType<Primitive.NUMBER> = {
      type: Primitive.NUMBER,
      key,
      required,
      ...rest,
    };
    Reflect.defineMetadata(keyName, metadata, target);
  };
};
