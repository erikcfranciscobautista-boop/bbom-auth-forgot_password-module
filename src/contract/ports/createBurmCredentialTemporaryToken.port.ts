export interface CreateBurmCredentialTemporaryTokenRequest {
  burmUserId: string;
  bcpmStatusId: string;
  bcpmDepartmentId: string;
  bcpmRoleId: string;
}

export type CreateBurmCredentialTemporaryTokenPort = (
  input: CreateBurmCredentialTemporaryTokenRequest,
) => Promise<void>;
