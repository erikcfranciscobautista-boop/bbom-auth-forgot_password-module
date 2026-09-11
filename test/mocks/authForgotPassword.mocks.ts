import type { AuthForgotPasswordContract } from "../../src/contract/index.contract.js";
import type { AuthForgotPasswordInDto } from "../../src/dto/index.dto.js";

export const mockGetBurmUserProfileIdentifiersUniqueOKPort = async ({
  burmUserName,
}: {
  burmUserName?: string;
}) => {
  if (burmUserName === "notfound") {
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
    bcpmStatusId: "status-1",
    bcpmStatusKey: "ACTIVE",
    bcpmStatusName: "Activo",
    bcpmStatusType: "OPERATIVE",
  };
};

export const mockPostBurmCredentialTemporaryTokensOKPort = async () => {
  return;
};

export const buildHappyPathContract = (
  req: AuthForgotPasswordInDto,
): AuthForgotPasswordContract => {
  return {
    req,
    ports: {
      getBurmUserProfileIdentifiersUniquePort: mockGetBurmUserProfileIdentifiersUniqueOKPort,
      getBcpmStatusesOnePort: mockGetBcpmStatusesOneOKPort,
      postBurmCredentialTemporaryTokensPort: mockPostBurmCredentialTemporaryTokensOKPort,
    },
    logger: {
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    },
  };
};

