import type {
  AuthForgotPasswordLogger,
  PostBurmCredentialTemporaryTokensPort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/index.errors.js";

export const jstepPostBurmCredentialTemporaryTokens = async ({
  burmUserId,
  bcpmStatusId,
  bcpmDepartmentId,
  bcpmRoleId,
  obfuscatedUsername,
  postBurmCredentialTemporaryTokens,
  logger,
}: {
  burmUserId: string;
  bcpmStatusId: string;
  bcpmDepartmentId: string;
  bcpmRoleId: string;
  obfuscatedUsername: string;
  postBurmCredentialTemporaryTokens: PostBurmCredentialTemporaryTokensPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<void> => {
  logger.info("Calling BURM postBurmCredentialTemporaryTokens", {
    username: obfuscatedUsername,
  });

  try {
    await postBurmCredentialTemporaryTokens({
      burmUserId,
      bcpmStatusId,
      bcpmDepartmentId,
      bcpmRoleId,
    });

    logger.info("BURM postBurmCredentialTemporaryTokens succeeded", {
      username: obfuscatedUsername,
    });
  } catch {
    logger.error("Failed during BURM temporary token creation", {
      username: obfuscatedUsername,
    });
    throw AuthForgotPasswordErrorConnectionBurm;
  }
};
