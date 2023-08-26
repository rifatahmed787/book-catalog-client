export type IName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id?: string;
  email: string;
  password: string;
  name: IName;
  address: string;
  imageUrl: string;
};
