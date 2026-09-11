import type {
  GetBurmUserProfileIdentifierPort,
  AuthForgotPasswordContract,
  AuthForgotPasswordLogger,
  GetBcpmStatusValidateActivePort,
  CreateBurmCredentialTemporaryTokenPort,
} from "../contract/index.contract.js";
import type { AuthForgotPasswordOutDto } from "../dto/index.dto.js";
import type { AuthForgotPasswordInDto } from "../dto/index.dto.js";
import {
  stepGetBurmUserProfileIdentifier,
  stepGetBcpmStatusValidateActive,
  stepPostBurmCredentialTemporaryToken,
} from "./steps/index.steps.js";
import { SUCCESS_RESPONSE } from "../response/index.response.js";

export class AuthForgotPasswordService {
  private getBurmUserProfileIdentifier: GetBurmUserProfileIdentifierPort;
  private getBcpmStatusValidateActive: GetBcpmStatusValidateActivePort;
  private postBurmCredentialTemporaryTokens: CreateBurmCredentialTemporaryTokenPort;
  private logger: AuthForgotPasswordLogger;

  constructor(options: AuthForgotPasswordContract) {
    this.getBurmUserProfileIdentifier = options.ports.getBurmUserProfileIdentifierPort;
    this.getBcpmStatusValidateActive = options.ports.getBcpmStatusesOnePort;
    this.postBurmCredentialTemporaryTokens = options.ports.createBurmCredentialTemporaryTokenPort;
    this.logger = options.logger ?? console;
  }


  async executeAuthForgotPasswordService(
    request: AuthForgotPasswordInDto,
  ): Promise<AuthForgotPasswordOutDto> {
    try {
      this.logger.info("-----------------------------------------------------");
      this.logger.info("start - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");

      this.logger.info("Forgot password flow started", {
        username: request.username,
      });
      const {username} = request;

      const profile = await stepGetBurmUserProfileIdentifier({
        username,
        getBurmUserProfileIdentifier: this.getBurmUserProfileIdentifier,
        logger: this.logger,
      });

      if (!profile) {
        return SUCCESS_RESPONSE;
      }

      const status = await stepGetBcpmStatusValidateActive({
        bcpmStatusId: profile.burmProfile.bcpmStatusId,
        username: username,
        getBcpmStatusValidateActive: this.getBcpmStatusValidateActive,
        logger: this.logger,
      });

      if (!status || !status.validate) {
        return SUCCESS_RESPONSE;
      }

      await stepPostBurmCredentialTemporaryToken({
        burmUserId: profile.burmUser.burmUserId,
        bcpmStatusId: profile.burmProfile.bcpmStatusId,
        bcpmDepartmentId: profile.burmProfile.bcpmDepartmentId,
        bcpmRoleId: profile.burmProfile.bcpmRoleId,
        username: username,
        createBurmCredentialTemporaryToken: this.postBurmCredentialTemporaryTokens,
        logger: this.logger,
      });

      this.logger.info("Forgot password flow finished", {
        username: username,
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
