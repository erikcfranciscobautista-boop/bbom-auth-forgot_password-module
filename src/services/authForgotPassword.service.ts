import type {
  AuthForgotPasswordContract,
  AuthForgotPasswordLogger,
  GetBcpmStatusesOnePort,
  GetBurmUserProfileIdentifiersUniquePort,
  PostBurmCredentialTemporaryTokensPort,
} from "../contract/index.contract.js";
import type { AuthForgotPasswordOutDto } from "../dto/index.dto.js";
import type { AuthForgotPasswordInDto } from "../dto/index.dto.js";
import { obfuscateIdentifier } from "../utils/index.utils.js";
import {
  jstepGetBcpmStatusesOne,
  jstepGetBurmUserProfileIdentifiersUnique,
  jstepPostBurmCredentialTemporaryTokens,
} from "./steps/index.steps.js";
import { SUCCESS_RESPONSE } from "../response/index.response.js";

export class AuthForgotPasswordService {
  private getBurmUserProfileIdentifiersUnique: GetBurmUserProfileIdentifiersUniquePort;
  private getBcpmStatusesOne: GetBcpmStatusesOnePort;
  private postBurmCredentialTemporaryTokens: PostBurmCredentialTemporaryTokensPort;
  private logger: AuthForgotPasswordLogger;

  constructor(options: AuthForgotPasswordContract) {
    this.getBurmUserProfileIdentifiersUnique = options.ports.getBurmUserProfileIdentifiersUniquePort;
    this.getBcpmStatusesOne = options.ports.getBcpmStatusesOnePort;
    this.postBurmCredentialTemporaryTokens = options.ports.postBurmCredentialTemporaryTokensPort;
    this.logger = options.logger ?? console;
  }


  async executeAuthForgotPasswordService(
    request: AuthForgotPasswordInDto,
  ): Promise<AuthForgotPasswordOutDto> {
    try {
      this.logger.info("-----------------------------------------------------");
      this.logger.info("start - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");

      const { username } = request;
      const obfuscatedUsername = obfuscateIdentifier(username);

      this.logger.info("Forgot password flow started", {
        username: obfuscatedUsername,
      });

      const profile = await jstepGetBurmUserProfileIdentifiersUnique({
        username,
        obfuscatedUsername,
        getBurmUserProfileIdentifiersUnique: this.getBurmUserProfileIdentifiersUnique,
        logger: this.logger,
      });

      if (!profile) {
        return SUCCESS_RESPONSE;
      }

      const status = await jstepGetBcpmStatusesOne({
        bcpmStatusId: profile.burmProfile.bcpmStatusId,
        obfuscatedUsername,
        getBcpmStatusesOne: this.getBcpmStatusesOne,
        logger: this.logger,
      });

      if (!status) {
        return SUCCESS_RESPONSE;
      }

      await jstepPostBurmCredentialTemporaryTokens({
        burmUserId: profile.burmUser.burmUserId,
        bcpmStatusId: profile.burmProfile.bcpmStatusId,
        bcpmDepartmentId: profile.burmProfile.bcpmDepartmentId,
        bcpmRoleId: profile.burmProfile.bcpmRoleId,
        obfuscatedUsername,
        postBurmCredentialTemporaryTokens: this.postBurmCredentialTemporaryTokens,
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
