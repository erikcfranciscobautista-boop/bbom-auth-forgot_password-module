export interface GetBcpmStatusesStatusIdInput {
  bcpmStatusId: string;
}

export interface GetBcpmStatusesStatusIdOutput {
  bcpmStatusId: string;
  bcpmStatusKey: string | null;
  bcpmStatusName: string;
  bcpmStatusType: string;
}

export type GetBcpmStatusesStatusIdPort = (
  input: GetBcpmStatusesStatusIdInput,
) => Promise<GetBcpmStatusesStatusIdOutput>;
