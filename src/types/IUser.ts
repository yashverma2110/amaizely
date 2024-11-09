interface IUser {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  dob: null | string;
  createdAt: string;
  totalDecks: number;
  updatedAt: string;
  profileImage: string | null;
  country: string | null;
  google: {
    profileId: string;
    displayName: string;
  } | null;
}

export type { IUser };