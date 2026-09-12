import type {
  AuthForgotPasswordLogger,
  GetBcpmStatusValidateActiveResponse,
  GetBcpmStatusValidateActivePort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBcpm } from "../../errors/index.errors.js";

export const stepGetBcpmStatusValidateActive = async ({
  bcpmStatusId,
  username,
  getBcpmStatusValidateActive,
  logger,
}: {
  bcpmStatusId: string;
  username: string;
  getBcpmStatusValidateActive: GetBcpmStatusValidateActivePort;
  logger: AuthForgotPasswordLogger;
}
): Promise<GetBcpmStatusValidateActiveResponse | null> => {
  let status;

  logger.info("Calling BCPM getBcpmStatusValidateActive", {
    username,
    bcpmStatusId,
  });

  try {
    status = await getBcpmStatusValidateActive({ bcpmStatusId });
  } catch {
    logger.error("Failed during BCPM status lookup", {
      username: username,
    });
    throw AuthForgotPasswordErrorConnectionBcpm;
  }

  logger.info("BCPM getBcpmStatusesOne succeeded", {
    username: username,
    statusKey: status.bcpmStatusKey,
  });

  if (!status.bcpmStatusKey || status.bcpmStatusKey !== "ACTIVE") {
    logger.info("Profile inactive, returning generic success", {
      username: username,
      statusKey: status.bcpmStatusKey,
    });
    return null;
  }

  return status;
};
