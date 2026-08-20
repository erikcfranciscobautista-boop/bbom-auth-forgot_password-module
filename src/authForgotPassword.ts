import type {
  AuthForgotPasswordContract,
} from "./contract/index.contract.js";
import { AuthForgotPasswordService } from "./services/index.services.js";
import type { AuthForgotPasswordOutDto } from "./dto/index.dto.js";

export async function authForgotPassword(
  contract: AuthForgotPasswordContract,
): Promise<AuthForgotPasswordOutDto> {
  const service = new AuthForgotPasswordService(contract);
  return await service.executeAuthForgotPasswordService(contract.req);
}
