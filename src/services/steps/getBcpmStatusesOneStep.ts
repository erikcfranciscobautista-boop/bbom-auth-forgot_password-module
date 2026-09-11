import type {
  AuthForgotPasswordLogger,
  GetBcpmStatusesOneOutput,
  GetBcpmStatusesOnePort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBcpm } from "../../errors/index.errors.js";

export const jstepGetBcpmStatusesOne = async ({
  bcpmStatusId,
  obfuscatedUsername,
  getBcpmStatusesOne,
  logger,
}: {
  bcpmStatusId: string;
  obfuscatedUsername: string;
  getBcpmStatusesOne: GetBcpmStatusesOnePort;
  logger: AuthForgotPasswordLogger;
}
): Promise<GetBcpmStatusesOneOutput | null> => {
  let status;

  logger.info("Calling BCPM getBcpmStatusesOne", {
    username: obfuscatedUsername,
    bcpmStatusId,
  });

  try {
    status = await getBcpmStatusesOne({ bcpmStatusId });
  } catch {
    logger.error("Failed during BCPM status lookup", {
      username: obfuscatedUsername,
    });
    throw AuthForgotPasswordErrorConnectionBcpm;
  }

  logger.info("BCPM getBcpmStatusesOne succeeded", {
    username: obfuscatedUsername,
    statusKey: status.bcpmStatusKey,
  });

  if (!status.bcpmStatusKey || status.bcpmStatusKey !== "ACTIVE") {
    logger.info("Profile inactive, returning generic success", {
      username: obfuscatedUsername,
      statusKey: status.bcpmStatusKey,
    });
    return null;
  }

  return status;
};
