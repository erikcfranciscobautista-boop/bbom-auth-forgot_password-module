import type {
  GetBurmUserProfileIdentifierPort,
  GetBcpmStatusValidateActivePort,
  CreateBurmCredentialTemporaryTokenPort,
} from "./ports/index.ports.js";

export interface AuthForgotPasswordLogger {
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
  error?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
}

export interface AuthForgotPasswordContract {
  req: unknown;
  ports: {
    getBurmUserProfileIdentifierPort: GetBurmUserProfileIdentifierPort;
    getBcpmStatusValidateActivePort: GetBcpmStatusValidateActivePort;
    createBurmCredentialTemporaryTokenPort: CreateBurmCredentialTemporaryTokenPort;
  };
  logger?: AuthForgotPasswordLogger;
}

export type {
  GetBcpmStatusValidateActiveRequest,
  GetBcpmStatusValidateActiveResponse,
  GetBcpmStatusValidateActivePort,

  GetBurmUserProfileIdentifierRequest,
  GetBurmUserProfileIdentifierResponse,
  GetBurmUserProfileIdentifierPort,

  CreateBurmCredentialTemporaryTokenRequest,
  CreateBurmCredentialTemporaryTokenResponse,
  CreateBurmCredentialTemporaryTokenPort,
} from './ports/index.ports.ts'