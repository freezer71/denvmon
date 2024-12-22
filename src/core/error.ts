export class NotFoundError extends Error {
  constructor(key: string) {
    super(`${key} is required on proccess.env`);
  }
}
export class InValidValue extends Error {
  constructor(key: string,value: any,message?: string) {
    super(`${message}\n${key} is not a valid value for ${value}`);
  }
}
