export interface PostBurmProfilesSearchInput {
  username: string;
}

export interface PostBurmProfilesSearchOutput {
  burmUserId: string;
  bcpmStatusId: string;
  burmUserEmail: string;
  burmUserPhone: string;
}

export type PostBurmProfilesSearchPort = (
  input: PostBurmProfilesSearchInput,
) => Promise<PostBurmProfilesSearchOutput>;
