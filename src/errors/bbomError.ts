import type { AuthForgotPasswordErrorOutDto } from "../dto/authForgotPassword.error.dto.js";

export class BbomClientError extends Error {
  readonly response: AuthForgotPasswordErrorOutDto;

  constructor(response: AuthForgotPasswordErrorOutDto) {
    super(response.details.message);
    this.name = "BbomClientError";
    this.response = response;
  }
}

export class BbomConnectionError extends Error {
  readonly response: AuthForgotPasswordErrorOutDto;

  constructor(response: AuthForgotPasswordErrorOutDto) {
    super(response.details.message);
    this.name = "BbomConnectionError";
    this.response = response;
  }
}
