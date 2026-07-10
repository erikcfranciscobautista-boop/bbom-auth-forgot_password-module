import type { PostBurmProfilesSearchOutput } from "../../contract/ports/postBurmProfilesSearch.port.js";
import type { PostBurmProfilesSearchPort } from "../../contract/ports/postBurmProfilesSearch.port.js";
import type { AuthForgotPasswordLogger } from "../../contract/authForgotPassword.contract.js";
import { BbomConnectionError } from "../../errors/bbomError.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/authForgotPassword.errors.js";
import { extractStatusCode } from "../../utils/errorUtils.js";

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
