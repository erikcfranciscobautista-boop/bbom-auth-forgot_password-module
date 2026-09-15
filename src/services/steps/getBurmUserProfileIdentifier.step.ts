import type {
  AuthForgotPasswordLogger,
  GetBurmUserProfileIdentifierRequest,
  GetBurmUserProfileIdentifierResponse,
  GetBurmUserProfileIdentifierPort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorService } from "../../errors/index.errors.js";
import { SUCCESS_RESPONSE } from "../../response/index.response.js";
import { getStatusCode } from "../../utils/index.utils.js";

export const stepGetBurmUserProfileIdentifier = async (
  request: GetBurmUserProfileIdentifierRequest,
  getBurmUserProfileIdentifier: GetBurmUserProfileIdentifierPort,
  logger: AuthForgotPasswordLogger
): Promise<GetBurmUserProfileIdentifierResponse> => {
  logger.info("step : getBurmUserProfileIdentifier ", {username: request.username});
  try {
    const response = await getBurmUserProfileIdentifier({username: request.username});
    logger.info("step : getBurmUserProfileIdentifier succeeded");
    return response;
  } catch (error) {
    logger.error?.('step : getBurmUserProfileIdentifier failed', error);
    const statusCode = getStatusCode(error);
    if (statusCode === 401 || statusCode === 404) {
        logger.info("step : getBurmUserProfileIdentifier is error due to status code", {
          username: request.username,
          statusCode,
        });
        throw SUCCESS_RESPONSE;
    }
      logger.error("step : getBurmUserProfileIdentifier is unexpected error", request);
    throw AuthForgotPasswordErrorService;
  }
};
