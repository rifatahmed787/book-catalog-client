import { IBook } from "./Book";
import { IUser } from "./User";

export type IWish = {
	_id?: string;
	book_id: string | IBook;
	user_id: string | IUser;
};

