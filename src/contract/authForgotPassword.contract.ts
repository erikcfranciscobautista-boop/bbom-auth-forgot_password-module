import type { GetBcpmStatusesStatusIdPort } from "./ports/getBcpmStatusesStatusId.port.js";
import type { PostBurmCredentialsRecoveryTokenPort } from "./ports/postBurmCredentialsRecoveryToken.port.js";
import type { PostBurmProfilesSearchPort } from "./ports/postBurmProfilesSearch.port.js";
import type { AuthForgotPasswordInDto } from "../dto/authForgotPassword.in.dto.js";

export interface AuthForgotPasswordLogger {
  info: (message: string, metadata?: Record<string, unknown>) => void;
  warn: (message: string, metadata?: Record<string, unknown>) => void;
  error: (message: string, metadata?: Record<string, unknown>) => void;
}

export interface AuthForgotPasswordContract {
  req: AuthForgotPasswordInDto;
  ports: {
    postBurmProfilesSearchPort: PostBurmProfilesSearchPort;
    getBcpmStatusesStatusIdPort: GetBcpmStatusesStatusIdPort;
    postBurmCredentialsRecoveryTokenPort: PostBurmCredentialsRecoveryTokenPort;
  };
  logger?: AuthForgotPasswordLogger;
}
