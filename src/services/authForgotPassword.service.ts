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
    this.getBcpmStatusValidateActive = options.ports.getBcpmStatusValidateActivePort;
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

      const profile = await stepGetBurmUserProfileIdentifier(
        {username : request.username},
        this.getBurmUserProfileIdentifier,
        this.logger
      );

      await stepGetBcpmStatusValidateActive(
        request.username,
        {
          bcpmStatusId: profile.burmProfile.bcpmStatusId,
        },
        this.getBcpmStatusValidateActive,
        this.logger,
      );

      await stepPostBurmCredentialTemporaryToken(
        request.username,
        {
          burmUserId: profile.burmUser.burmUserId,
          bcpmStatusId: profile.burmProfile.bcpmStatusId,
          bcpmDepartmentId: profile.burmProfile.bcpmDepartmentId,
          bcpmRoleId: profile.burmProfile.bcpmRoleId,
        },
        this.postBurmCredentialTemporaryTokens,
        this.logger
      );

      this.logger.info("Forgot password flow finished", {
        username: request.username,
      });

      this.logger.info("-----------------------------------------------------");
      this.logger.info("end - OK - executeAuthForgotPasswordService");
      this.logger.info("-----------------------------------------------------");

      return SUCCESS_RESPONSE;
    } catch (error) {
      if(error === SUCCESS_RESPONSE){
        return SUCCESS_RESPONSE;
      }
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
