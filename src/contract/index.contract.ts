import type {
  GetBcpmStatusesOnePort,
  GetBurmUserProfileIdentifiersUniquePort,
  PostBurmCredentialTemporaryTokensPort,
} from "./ports/index.ports.js";
import type { AuthForgotPasswordInDto } from "../dto/index.dto.js";

export interface AuthForgotPasswordLogger {
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
}

export interface AuthForgotPasswordContract {
  req: unknown;
  ports: {
    getBurmUserProfileIdentifiersUniquePort: GetBurmUserProfileIdentifiersUniquePort;
    getBcpmStatusesOnePort: GetBcpmStatusesOnePort;
    postBurmCredentialTemporaryTokensPort: PostBurmCredentialTemporaryTokensPort;
  };
  logger?: AuthForgotPasswordLogger;
}

export type {
  GetBcpmStatusesOneInput,
  GetBcpmStatusesOneOutput,
  GetBcpmStatusesOnePort,
  GetBurmUserProfileIdentifiersUniqueInput,
  GetBurmUserProfileIdentifiersUniqueOutput,
  GetBurmUserProfileIdentifiersUniquePort,
  PostBurmCredentialTemporaryTokensInput,
  PostBurmCredentialTemporaryTokensPort,
} from './ports/index.ports.ts'