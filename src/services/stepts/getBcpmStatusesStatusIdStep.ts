import type {
  AuthForgotPasswordLogger,
  GetBcpmStatusesStatusIdOutput,
  GetBcpmStatusesStatusIdPort,
} from "../../contract/index.contract.js";
import {
  AuthForgotPasswordErrorConnectionBcpm,
  BbomConnectionError,
} from "../../response/error/index.error.js";

export const jstepGetBcpmStatusesStatusId = async ({
  bcpmStatusId,
  obfuscatedUsername,
  getBcpmStatusesStatusId,
  logger,
}: {
  bcpmStatusId: string;
  obfuscatedUsername: string;
  getBcpmStatusesStatusId: GetBcpmStatusesStatusIdPort;
  logger: AuthForgotPasswordLogger;
}
): Promise<GetBcpmStatusesStatusIdOutput | null> => {
  let status;

  try {
    status = await getBcpmStatusesStatusId({ bcpmStatusId });
  } catch {
    logger.error("Failed during BCPM status lookup", {
      username: obfuscatedUsername,
    });
    throw new BbomConnectionError(AuthForgotPasswordErrorConnectionBcpm);
  }

  if (!status.bcpmStatusKey || status.bcpmStatusKey !== "ACTIVE") {
    logger.info("Profile inactive, returning generic success", {
      username: obfuscatedUsername,
      statusKey: status.bcpmStatusKey,
    });
    return null;
  }

  return status;
};
