import type {
  AuthForgotPasswordLogger,
  CreateBurmCredentialTemporaryTokenPort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/index.errors.js";

export const stepPostBurmCredentialTemporaryToken = async ({
  burmUserId,
  bcpmStatusId,
  bcpmDepartmentId,
  bcpmRoleId,
  username,
  createBurmCredentialTemporaryToken,
  logger,
}: {
  burmUserId: string;
  bcpmStatusId: string;
  bcpmDepartmentId: string;
  bcpmRoleId: string;
  username: string;
  createBurmCredentialTemporaryToken: CreateBurmCredentialTemporaryTokenPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<void> => {
  logger.info("Calling BURM postBurmCredentialTemporaryTokens", {
    username: username,
  });

  try {
    await createBurmCredentialTemporaryToken({
      burmUserId,
      bcpmStatusId,
      bcpmDepartmentId,
      bcpmRoleId,
    });

    logger.info("BURM postBurmCredentialTemporaryTokens succeeded", {
      username: username,
    });
  } catch {
    logger.error("Failed during BURM temporary token creation", {
      username: username,
    });
    throw AuthForgotPasswordErrorConnectionBurm;
  }
};
