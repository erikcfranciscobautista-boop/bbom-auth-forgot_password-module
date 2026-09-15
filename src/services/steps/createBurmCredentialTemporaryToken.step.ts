import type {
  AuthForgotPasswordLogger,
  CreateBurmCredentialTemporaryTokenRequest,
  CreateBurmCredentialTemporaryTokenResponse,
  CreateBurmCredentialTemporaryTokenPort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorService } from "../../errors/index.errors.js";

export const stepPostBurmCredentialTemporaryToken = async (
  username: string,
  request: CreateBurmCredentialTemporaryTokenRequest,
  createBurmCredentialTemporaryToken: CreateBurmCredentialTemporaryTokenPort,
  logger: AuthForgotPasswordLogger
): Promise<CreateBurmCredentialTemporaryTokenResponse> => {
  logger.info("step : createBurmCredentialTemporaryToken ", {username,request});

  try {
    const response = await createBurmCredentialTemporaryToken(request);
    logger.info("step : createBurmCredentialTemporaryToken succeeded");
    return response;
  } catch(error) {
    logger.error?.('step : createBurmCredentialTemporaryToken failed', error);
    throw AuthForgotPasswordErrorService;
  }
};
