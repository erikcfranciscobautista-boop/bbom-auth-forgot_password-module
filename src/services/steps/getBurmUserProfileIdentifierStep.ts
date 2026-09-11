import type {
  AuthForgotPasswordLogger,
  GetBurmUserProfileIdentifierRequest,
  GetBurmUserProfileIdentifierResponse,
  GetBurmUserProfileIdentifierPort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/index.errors.js";
import { getStatusCode } from "../../utils/index.utils.js";

export const stepGetBurmUserProfileIdentifier = async ({
  username,
  getBurmUserProfileIdentifier,
  logger,
}: {
  username: string;
  getBurmUserProfileIdentifier: GetBurmUserProfileIdentifierPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<GetBurmUserProfileIdentifierResponse | null> => {
  logger.info("Calling BURM getBurmUserProfileIdentifier", {
    username: username,
  });

  try {
    const profile = await getBurmUserProfileIdentifier({username});

    logger.info("BURM getBurmUserProfileIdentifier succeeded", {
      username: username,
    });

    return profile;
  } catch (error) {
    const statusCode = getStatusCode(error);

    if (statusCode === 401 || statusCode === 404) {
      logger.info("Profile not available, returning generic success", {
        username: username,
        statusCode,
      });
      return null;
    }

    logger.error("Failed during BURM profile identifiers lookup", {
      username: username,
    });
    throw AuthForgotPasswordErrorConnectionBurm;
  }
};
