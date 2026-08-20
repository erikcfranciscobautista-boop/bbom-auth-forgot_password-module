import type {
  AuthForgotPasswordLogger,
  PostBurmCredentialsRecoveryTokenPort,
} from "../../contract/index.contract.js";
import {
  AuthForgotPasswordErrorConnectionBurm,
  BbomConnectionError,
} from "../../response/error/index.error.js";

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
