import type {
  AuthForgotPasswordLogger,
  GetBurmUserProfileIdentifiersUniqueInput,
  GetBurmUserProfileIdentifiersUniqueOutput,
  GetBurmUserProfileIdentifiersUniquePort,
} from "../../contract/index.contract.js";
import { AuthForgotPasswordErrorConnectionBurm } from "../../errors/index.errors.js";
import { getStatusCode } from "../../utils/index.utils.js";

const EMAIL_SEPARATOR = "@";

// maps the single "username" input to the identifier param BURM expects
const buildIdentifierParams = (username: string): GetBurmUserProfileIdentifiersUniqueInput => {
  const trimmed = username.trim();

  if (trimmed.includes(EMAIL_SEPARATOR)) {
    return { burmUserEmail: trimmed };
  }

  if (/^\d+$/.test(trimmed)) {
    return { burmUserPhone: trimmed };
  }

  return { burmUserName: trimmed };
};

export const jstepGetBurmUserProfileIdentifiersUnique = async ({
  username,
  obfuscatedUsername,
  getBurmUserProfileIdentifiersUnique,
  logger,
}: {
  username: string;
  obfuscatedUsername: string;
  getBurmUserProfileIdentifiersUnique: GetBurmUserProfileIdentifiersUniquePort;
  logger: AuthForgotPasswordLogger;
}
): Promise<GetBurmUserProfileIdentifiersUniqueOutput | null> => {
  logger.info("Calling BURM getBurmUserProfileIdentifiersUnique", {
    username: obfuscatedUsername,
  });

  try {
    const profile = await getBurmUserProfileIdentifiersUnique(buildIdentifierParams(username));

    logger.info("BURM getBurmUserProfileIdentifiersUnique succeeded", {
      username: obfuscatedUsername,
    });

    return profile;
  } catch (error) {
    const statusCode = getStatusCode(error);

    if (statusCode === 401 || statusCode === 404) {
      logger.info("Profile not available, returning generic success", {
        username: obfuscatedUsername,
        statusCode,
      });
      return null;
    }

    logger.error("Failed during BURM profile identifiers lookup", {
      username: obfuscatedUsername,
    });
    throw AuthForgotPasswordErrorConnectionBurm;
  }
};
