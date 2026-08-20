import type {
  AuthForgotPasswordLogger,
  PostBurmProfilesSearchOutput,
  PostBurmProfilesSearchPort,
} from "../../contract/index.contract.js";
import {
  AuthForgotPasswordErrorConnectionBurm,
  BbomConnectionError,
} from "../../response/error/index.error.js";
import { extractStatusCode } from "../../utils/index.utils.js";

export const jstepPostBurmProfilesSearch = async ({
  username,
  obfuscatedUsername,
  postBurmProfilesSearch,
  logger,
}: {
  username: string;
  obfuscatedUsername: string;
  postBurmProfilesSearch: PostBurmProfilesSearchPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<PostBurmProfilesSearchOutput | null> => {
  try {
    return await postBurmProfilesSearch({ username });
  } catch (error) {
    logger.error("Failed during BURM profile search : "+ error);
    const statusCode = extractStatusCode(error);

    if (statusCode === 401 || statusCode === 404) {
      logger.info("Profile not available, returning generic success", {
        username: obfuscatedUsername,
        statusCode,
      });
      return null;
    }

    logger.error("Failed during BURM profile search", {
      username: obfuscatedUsername,
    });
    throw new BbomConnectionError(AuthForgotPasswordErrorConnectionBurm);
  }
};
