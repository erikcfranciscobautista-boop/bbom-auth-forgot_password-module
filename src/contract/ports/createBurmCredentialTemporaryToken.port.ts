export interface CreateBurmCredentialTemporaryTokenRequest {
  burmUserId: string;
  bcpmStatusId: string;
  bcpmDepartmentId: string;
  bcpmRoleId: string;
}

export interface CreateBurmCredentialTemporaryTokenResponse {
  token: string;
}
export type CreateBurmCredentialTemporaryTokenPort = (
  input: CreateBurmCredentialTemporaryTokenRequest,
) => Promise<CreateBurmCredentialTemporaryTokenResponse>;
