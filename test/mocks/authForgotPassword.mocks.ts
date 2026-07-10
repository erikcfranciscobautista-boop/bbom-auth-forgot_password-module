import type { AuthForgotPasswordContract } from "../../src/contract/authForgotPassword.contract.js";
import type { AuthForgotPasswordInDto } from "../../src/dto/authForgotPassword.in.dto.js";

export const mockPostBurmProfilesSearchOKPort = async ({ username }: { username: string }) => {
  if (username === "notfound") {
    const error = new Error("Profile not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return {
    burmUserId: "burm-user-1",
    bcpmStatusId: "status-1",
    burmUserEmail: "user@example.com",
    burmUserPhone: "5530123456",
  };
};

export const mockGetBcpmStatusesStatusIdOKPort = async () => {
  return {
    bcpmStatusId: "status-1",
    bcpmStatusKey: "ACTIVE",
    bcpmStatusName: "Activo",
    bcpmStatusType: "OPERATIVE",
  };
};

export const mockPostBurmCredentialsRecoveryTokenOKPort = async () => {
  return;
};

export const buildHappyPathContract = (
  req: AuthForgotPasswordInDto,
): AuthForgotPasswordContract => {
  return {
    req,
    ports: {
      postBurmProfilesSearchPort: mockPostBurmProfilesSearchOKPort,
      getBcpmStatusesStatusIdPort: mockGetBcpmStatusesStatusIdOKPort,
      postBurmCredentialsRecoveryTokenPort: mockPostBurmCredentialsRecoveryTokenOKPort,
    },
    logger: {
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    },
  };
};
