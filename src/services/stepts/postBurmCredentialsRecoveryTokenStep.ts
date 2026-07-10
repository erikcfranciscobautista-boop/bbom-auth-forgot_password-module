import type { PostBurmCredentialsRecoveryTokenPort } from "../../contract/ports/postBurmCredentialsRecoveryToken.port.js";
import type { AuthForgotPasswordLogger } from "../../contract/authForgotPassword.contract.js";
import { BbomConnectionError } from "../../errors/bbomError.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/authForgotPassword.errors.js";

export const jstepPostBurmCredentialsRecoveryToken = async ({
  burmUserId,
  bcpmStatusId,
  burmUserEmail,
  obfuscatedUsername,
  postBurmCredentialsRecoveryToken,
  logger,
}: {
  burmUserId: string;
  bcpmStatusId: string;
  burmUserEmail: string;
  obfuscatedUsername: string;
  postBurmCredentialsRecoveryToken: PostBurmCredentialsRecoveryTokenPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<void> => {
  try {
    await postBurmCredentialsRecoveryToken({
      burmUserId,
      bcpmStatusId,
      burmUserEmail,
    });
  } catch {
    logger.error("Failed during BURM recovery token creation", {
      username: obfuscatedUsername,
    });
    throw new BbomConnectionError(AuthForgotPasswordErrorConnectionBurm);
  }
};
