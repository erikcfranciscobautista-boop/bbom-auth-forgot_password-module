import type {
  GetBcpmStatusesStatusIdPort,
  PostBurmCredentialsRecoveryTokenPort,
  PostBurmProfilesSearchPort,
} from "./ports/index.ports.js";
import type { AuthForgotPasswordInDto } from "../dto/index.dto.js";

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
