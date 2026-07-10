import type { AuthForgotPasswordInDto } from "../dto/authForgotPassword.in.dto.js";
import type { AuthForgotPasswordOutDto } from "../dto/authForgotPassword.out.dto.js";
import type {
  AuthForgotPasswordErrorDetailsDto,
  AuthForgotPasswordErrorOutDto,
} from "../dto/authForgotPassword.error.dto.js";

export type AuthForgotPasswordRequest = AuthForgotPasswordInDto;
export type AuthForgotPasswordSuccessResponse = AuthForgotPasswordOutDto;
export type ErrorDetails = AuthForgotPasswordErrorDetailsDto;
export type AuthForgotPasswordErrorResponse = AuthForgotPasswordErrorOutDto;
