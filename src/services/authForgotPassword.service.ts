import type {
  AuthForgotPasswordContract,
  AuthForgotPasswordLogger,
} from "../contract/authForgotPassword.contract.js";
import type { AuthForgotPasswordInDto } from "../dto/authForgotPassword.in.dto.js";
import type { AuthForgotPasswordOutDto } from "../dto/authForgotPassword.out.dto.js";
import { obfuscateIdentifier } from "../utils/obfuscate.js";
import { jstepGetBcpmStatusesStatusId } from "./stepts/getBcpmStatusesStatusIdStep.js";
import { jstepPostBurmCredentialsRecoveryToken } from "./stepts/postBurmCredentialsRecoveryTokenStep.js";
import { jstepPostBurmProfilesSearch } from "./stepts/postBurmProfilesSearchStep.js";
import type {
  GetBcpmStatusesStatusIdPort
} from "../contract/ports/getBcpmStatusesStatusId.port.js";
import type { PostBurmCredentialsRecoveryTokenPort } from "../contract/ports/postBurmCredentialsRecoveryToken.port.js";
import type { PostBurmProfilesSearchPort } from "../contract/ports/postBurmProfilesSearch.port.js";

const SUCCESS_RESPONSE: AuthForgotPasswordOutDto = {
  message: "Si el usuario existe, recibiras una notificacion de recuperacion",
};

const buildLogger = (logger?: AuthForgotPasswordLogger): AuthForgotPasswordLogger => {
  if (logger) {
    return logger;
  }

  return {
    info: (message, metadata) => console.info(message, metadata),
    warn: (message, metadata) => console.warn(message, metadata),
    error: (message, metadata) => console.error(message, metadata),
  };
};

export class AuthForgotPasswordService {
  private postBurmProfilesSearch: PostBurmProfilesSearchPort;
  private getBcpmStatusesStatusId: GetBcpmStatusesStatusIdPort;
  private postBurmCredentialsRecoveryToken: PostBurmCredentialsRecoveryTokenPort;
  private logger: AuthForgotPasswordLogger;

  constructor(options: AuthForgotPasswordContract) {
    this.postBurmProfilesSearch = options.ports.postBurmProfilesSearchPort;
    this.getBcpmStatusesStatusId = options.ports.getBcpmStatusesStatusIdPort;
    this.postBurmCredentialsRecoveryToken = options.ports.postBurmCredentialsRecoveryTokenPort;
    this.logger = buildLogger(options.logger);
  }

  async executeAuthForgotPasswordService(
    input: AuthForgotPasswordInDto,
  ): Promise<AuthForgotPasswordOutDto> {
    try {
      this.logger.info("-----------------------------------------------------");
      this.logger.info("start - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");

      const { username } = input;
      const obfuscatedUsername = obfuscateIdentifier(username);

      this.logger.info("Forgot password flow started", {
        username: obfuscatedUsername,
      });

      const profile = await jstepPostBurmProfilesSearch({
        username,
        obfuscatedUsername,
        postBurmProfilesSearch: this.postBurmProfilesSearch,
        logger: this.logger,
      });

      if (!profile) {
        return SUCCESS_RESPONSE;
      }

      const status = await jstepGetBcpmStatusesStatusId({
        bcpmStatusId: profile.bcpmStatusId,
        obfuscatedUsername,
        getBcpmStatusesStatusId: this.getBcpmStatusesStatusId,
        logger: this.logger,
      });

      if (!status) {
        return SUCCESS_RESPONSE;
      }

      await jstepPostBurmCredentialsRecoveryToken({
        burmUserId: profile.burmUserId,
        bcpmStatusId: profile.bcpmStatusId,
        burmUserEmail: profile.burmUserEmail,
        obfuscatedUsername,
        postBurmCredentialsRecoveryToken: this.postBurmCredentialsRecoveryToken,
        logger: this.logger,
      });

      this.logger.info("Forgot password flow finished", {
        username: obfuscatedUsername,
      });

      this.logger.info("-----------------------------------------------------");
      this.logger.info("end - OK - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");

      return SUCCESS_RESPONSE;
    } catch (error) {
      this.logger.error("Error in executeAuthForgotPasswordService", {
        error,
      });
      this.logger.info("-----------------------------------------------------");
      this.logger.info("end - ERROR - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");
      throw error;
    }
  }
}
