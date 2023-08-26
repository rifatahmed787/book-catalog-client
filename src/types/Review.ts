import { IBook } from "./Book";
import { IUser } from "./User";

export type IReview = {
	_id?: string;
	rating: number;
	review: string;
	reviewed_by: string | IUser;
	book_id: string | IBook;
};

