export interface GetBurmUserProfileIdentifiersUniqueInput {
  burmUserPhone?: string;
  burmUserEmail?: string;
  burmUserName?: string;
  burmUserFirstSurname?: string;
  userBcpmStatusId?: string;
  burmUserGender?: string;
  burmUserBirthday?: string;
  profileBcpmStatusId?: string;
  profileBcpmRoleId?: string;
  profileBcpmDepartmentId?: string;
  nickname?: string;
}

// only the fields this module actually consumes from BURM's response
export interface GetBurmUserProfileIdentifiersUniqueOutput {
  burmUser: {
    burmUserId: string;
  };
  burmProfile: {
    bcpmRoleId: string;
    bcpmStatusId: string;
    bcpmDepartmentId: string;
  };
}

export type GetBurmUserProfileIdentifiersUniquePort = (
  input: GetBurmUserProfileIdentifiersUniqueInput,
) => Promise<GetBurmUserProfileIdentifiersUniqueOutput>;

