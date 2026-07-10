export interface PostBurmCredentialsRecoveryTokenInput {
  burmUserId: string;
  bcpmStatusId: string;
  burmUserEmail: string;
}

export type PostBurmCredentialsRecoveryTokenPort = (
  input: PostBurmCredentialsRecoveryTokenInput,
) => Promise<void>;
