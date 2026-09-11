export interface PostBurmCredentialTemporaryTokensInput {
  burmUserId: string;
  bcpmStatusId: string;
  bcpmDepartmentId: string;
  bcpmRoleId: string;
}

export type PostBurmCredentialTemporaryTokensPort = (
  input: PostBurmCredentialTemporaryTokensInput,
) => Promise<void>;
