export enum Primitive {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
}
export type Optional<T extends Record<string, any>, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface PrimitiveBase<T>{
  defaultValue?: T;
  required: boolean;
  key: string;
} 
export interface PrimitiveString extends PrimitiveBase<string>{
  type: Primitive.STRING;
  isEmptyAllow?: boolean;
  max?: number
  min?: number,
}
export interface PrimitiveNumber extends PrimitiveBase<number>{
  type: Primitive.NUMBER;
  isNegativeAllow?: boolean;
  isInt?: boolean;
}
/** 
 * types: [true,false] | [1,0] | [yes,no]
 *  */
export interface PrimitiveBoolean extends PrimitiveBase<boolean>{
  type: Primitive.BOOLEAN;
  types: [string,string];
}
interface PrimitiveToType {
  [Primitive.STRING]: PrimitiveString;
  [Primitive.NUMBER]: PrimitiveNumber;
  [Primitive.BOOLEAN]: PrimitiveBoolean;
}

export type DenvType<Type extends Primitive> = PrimitiveToType[Type];
export type DenvTypes = DenvType<Primitive>;