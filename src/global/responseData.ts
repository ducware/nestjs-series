/* eslint-disable prettier/prettier */
export class ResponseData<T> {
  data: T | T[];
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string);
  constructor(data: T | T[], statusCode: number, message: string);
  constructor(dataOrStatusCode: T | T[] | number, statusCodeOrMessage: number | string, message?: string) {
    if (typeof dataOrStatusCode === "number") {
      // The first constructor was used.
      this.statusCode = dataOrStatusCode as number;
      this.message = statusCodeOrMessage as string;
    } else {
      // The second constructor was used.
      this.data = dataOrStatusCode as T | T[];
      this.statusCode = statusCodeOrMessage as number;
      this.message = message as string;
    }
    
    return this;
  }
}
