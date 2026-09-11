export interface GetBcpmStatusValidateActiveRequest {
  bcpmStatusId: string;
}

export interface GetBcpmStatusValidateActiveResponse {
  validate: boolean;
}

export type GetBcpmStatusValidateActivePort = (
  input: GetBcpmStatusValidateActiveRequest,
) => Promise<GetBcpmStatusValidateActiveResponse>;
