import { AuthForgotPasswordError } from "./authForgotPassword.error.js";
import {
  BBOM_AUTH_FORGOT_PASSWORD_CONNECTION_BCPM,
  BBOM_AUTH_FORGOT_PASSWORD_CONNECTION_BURM,
  BBOM_AUTH_FORGOT_PASSWORD_INTERNAL_SERVER_ERROR,
  BBOM_AUTH_FORGOT_PASSWORD_VALIDATIONS_FORMAT,
} from "./constants/authForgotPasswordTrace.error.js";

export const AuthForgotPasswordErrorFormat = new AuthForgotPasswordError(
  400,
  BBOM_AUTH_FORGOT_PASSWORD_VALIDATIONS_FORMAT,
  "Required fields",
);

export const AuthForgotPasswordErrorConnectionBurm = new AuthForgotPasswordError(
  500,
  BBOM_AUTH_FORGOT_PASSWORD_CONNECTION_BURM,
  "Ocurrio un error, vuelve a intentarlo mas tarde.",
);

export const AuthForgotPasswordErrorConnectionBcpm = new AuthForgotPasswordError(
  500,
  BBOM_AUTH_FORGOT_PASSWORD_CONNECTION_BCPM,
  "Ocurrio un error, vuelve a intentarlo mas tarde.",
);

export const AuthForgotPasswordErrorInternal = new AuthForgotPasswordError(
  500,
  BBOM_AUTH_FORGOT_PASSWORD_INTERNAL_SERVER_ERROR,
  "Ocurrio un error, vuelve a intentarlo mas tarde.",
);
