import type {
  AuthForgotPasswordLogger,
  GetBcpmStatusValidateActiveResponse,
  GetBcpmStatusValidateActiveRequest,
  GetBcpmStatusValidateActivePort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorService } from "../../errors/index.errors.js";
import { SUCCESS_RESPONSE } from "../../response/index.response.js";
import { getStatusCode } from "../../utils/index.utils.js";


export const stepGetBcpmStatusValidateActive = async (
  username: string,
  request: GetBcpmStatusValidateActiveRequest,
  getBcpmStatusValidateActive: GetBcpmStatusValidateActivePort,
  logger: AuthForgotPasswordLogger
): Promise<GetBcpmStatusValidateActiveResponse> => {
  logger.info("step : getBcpmStatusValidateActive ", {username,request});

  try {
    const response = await getBcpmStatusValidateActive({ bcpmStatusId: request.bcpmStatusId });
    logger.info("step : getBcpmStatusValidateActive succeeded");
    if(!response.validated) {
      logger.warn?.('step : getBcpmStatusValidateActive failed with ko');
      throw SUCCESS_RESPONSE;
    }
    return response;
  } catch(error) {
    logger.error?.('step : getBcpmStatusValidateActive failed', error);
    throw AuthForgotPasswordErrorService;
  }
};
