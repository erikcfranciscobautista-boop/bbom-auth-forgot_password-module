import type {
  AuthForgotPasswordContract,
} from "./contract/index.contract.js";
import { AuthForgotPasswordService } from "./services/index.services.js";
import { AuthForgotPasswordInSchema, type AuthForgotPasswordOutDto } from "./dto/index.dto.js";
import { AuthForgotPasswordErrorFormat } from './errors/index.errors.js';

export async function authForgotPassword(
  contract: AuthForgotPasswordContract,
): Promise<AuthForgotPasswordOutDto> {
    const parseResult = AuthForgotPasswordInSchema.safeParse(contract.req);
    if (!parseResult.success) {
        throw AuthForgotPasswordErrorFormat;
    }

    const service = new AuthForgotPasswordService(contract);
    return await service.executeAuthForgotPasswordService(parseResult.data);
}
