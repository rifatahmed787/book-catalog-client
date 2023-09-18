import { IUser } from "./User";

export type IBlog = {
  _id?: string;
  title: string;
  tags: string[];
  image: string[];
  description: string;
  added_by_id: string | IUser;
  name: string;
  profile: string | IUser;
};
