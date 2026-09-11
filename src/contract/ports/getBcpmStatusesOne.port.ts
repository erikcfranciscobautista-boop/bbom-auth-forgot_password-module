export interface GetBcpmStatusesOneInput {
  bcpmStatusId: string;
}

export interface GetBcpmStatusesOneOutput {
  bcpmStatusId: string;
  bcpmStatusKey: string | null;
  bcpmStatusName: string;
  bcpmStatusType: string;
}

export type GetBcpmStatusesOnePort = (
  input: GetBcpmStatusesOneInput,
) => Promise<GetBcpmStatusesOneOutput>;
