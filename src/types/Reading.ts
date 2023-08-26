import { IBook } from "./Book";
import { IUser } from "./User";

export type IReading = {
	_id?: string;
	book_id: string | IBook;
	user_id: string | IUser;
};

