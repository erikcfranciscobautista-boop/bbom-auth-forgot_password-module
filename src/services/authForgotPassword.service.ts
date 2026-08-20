import type {
  AuthForgotPasswordContract,
  AuthForgotPasswordLogger,
  GetBcpmStatusesStatusIdPort,
  PostBurmCredentialsRecoveryTokenPort,
  PostBurmProfilesSearchPort,
} from "../contract/index.contract.js";
import type { AuthForgotPasswordInDto, AuthForgotPasswordOutDto } from "../dto/index.dto.js";
import { obfuscateIdentifier } from "../utils/index.utils.js";
import {
  AuthForgotPasswordErrorFormat,
  BbomClientError,
} from "../response/error/index.error.js";
import {
  jstepGetBcpmStatusesStatusId,
  jstepPostBurmCredentialsRecoveryToken,
  jstepPostBurmProfilesSearch,
} from "./stepts/index.steps.js";
import { SUCCESS_RESPONSE } from "../response/index.response.js";

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

const getMissingFields = (input: AuthForgotPasswordInDto): string[] => {
  const missingFields: string[] = [];

  if (!input.username || !input.username.trim()) {
    missingFields.push("username");
  }

  return missingFields;
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
      const missingFields = getMissingFields(input);
      if (missingFields.length > 0) {
        throw new BbomClientError({
          ...AuthForgotPasswordErrorFormat,
          details: {
            ...AuthForgotPasswordErrorFormat.details,
            missingFields,
          },
        });
      }

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
