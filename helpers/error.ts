export class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message || "Internal Server Error";
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
