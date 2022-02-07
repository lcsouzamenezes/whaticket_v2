class HttpStatus {
  static get OK(): number {
    return 200;
  }

  static get CREATED(): number {
    return 201;
  }

  static get NO_CONTENT(): number {
    return 204;
  }

  static get BAD_REQUEST(): number {
    return 400;
  }

  static get UNAUTHORIZED(): number {
    return 401;
  }

  static get FORBIDDEN(): number {
    return 403;
  }

  static get NOT_FOUND(): number {
    return 404;
  }

  static get CONFLICT(): number {
    return 409;
  }

  static get INTERNAL_SERVER_ERROR(): number {
    return 500;
  }
}

export default HttpStatus;
