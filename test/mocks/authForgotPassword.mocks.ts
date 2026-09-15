import type { AuthForgotPasswordContract } from "../../src/contract/index.contract.js";
import type { AuthForgotPasswordInDto } from "../../src/dto/index.dto.js";

export const mockGetBurmUserProfileIdentifiersUniqueOKPort = async ({
  username,
}: {
  username?: string;
}) => {
  if (username === "notfound") {
    const error = new Error("Profile not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return {
    burmUser: {
      burmUserId: "burm-user-1",
    },
    burmProfile: {
      bcpmRoleId: "role-1",
      bcpmStatusId: "status-1",
      bcpmDepartmentId: "department-1",
    },
  };
};

export const mockGetBcpmStatusesOneOKPort = async () => {
  return {
    validated: true,
  };
};

export const mockPostBurmCredentialTemporaryTokensOKPort = async () => {
  return {
    token : "temporary-token-1"
  };
};

export const buildHappyPathContract = (
  req: AuthForgotPasswordInDto,
): AuthForgotPasswordContract => {
  return {
    req,
    ports: {
      getBurmUserProfileIdentifierPort: mockGetBurmUserProfileIdentifiersUniqueOKPort,
      getBcpmStatusValidateActivePort: mockGetBcpmStatusesOneOKPort,
      createBurmCredentialTemporaryTokenPort: mockPostBurmCredentialTemporaryTokensOKPort,
    },
    logger: {
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    },
  };
};

