import HttpStatus from "./HttpStatus";

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
