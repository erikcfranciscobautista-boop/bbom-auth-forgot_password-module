import type { AuthForgotPasswordContract } from "./contract/authForgotPassword.contract.js";
import { AuthForgotPasswordService } from "./services/authForgotPassword.service.js";
import type { AuthForgotPasswordOutDto } from "./dto/authForgotPassword.out.dto.js";
import type { AuthForgotPasswordErrorOutDto } from "./dto/authForgotPassword.error.dto.js";
import { AuthForgotPasswordErrorService } from "./errors/authForgotPassword.errors.js";

export async function authForgotPassword(
  contract: AuthForgotPasswordContract,
): Promise<AuthForgotPasswordOutDto> {
  const service = new AuthForgotPasswordService(contract);
  return await service.executeAuthForgotPasswordService(contract.req);
}

export const mapErrorResponse = (error: unknown): AuthForgotPasswordErrorOutDto => {
  return AuthForgotPasswordErrorService.mapErrorResponse(error);
};
