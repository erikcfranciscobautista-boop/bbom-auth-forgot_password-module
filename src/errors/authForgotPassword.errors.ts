import { BbomClientError, BbomConnectionError } from "./bbomError.js";
import type { AuthForgotPasswordErrorOutDto } from "../dto/authForgotPassword.error.dto.js";

export const AuthForgotPasswordErrorConnectionBurm: AuthForgotPasswordErrorOutDto = {
  errorType: "BBOM-CONNECTION",
  errorCode: 500,
  details: {
    traceId: "CONNECT-BURM-FAILED",
    message: "Ocurrio un error, vuelve a intentarlo mas tarde.",
  },
};

export const AuthForgotPasswordErrorConnectionBcpm: AuthForgotPasswordErrorOutDto = {
  errorType: "BBOM-CONNECTION",
  errorCode: 500,
  details: {
    traceId: "CONNECT-BCPM-FAILED",
    message: "Ocurrio un error, vuelve a intentarlo mas tarde.",
  },
};

export const AuthForgotPasswordErrorInternal: AuthForgotPasswordErrorOutDto = {
  errorType: "BBOM-CONNECTION",
  errorCode: 500,
  details: {
    traceId: "INTERNAL-ERROR",
    message: "Ocurrio un error, vuelve a intentarlo mas tarde.",
  },
};

export class AuthForgotPasswordErrorService {
  static mapErrorResponse(error: unknown): AuthForgotPasswordErrorOutDto {
    if (error instanceof BbomClientError || error instanceof BbomConnectionError) {
      return error.response;
    }

    return AuthForgotPasswordErrorInternal;
  }
}
