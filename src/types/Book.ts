import { IUser } from "./User";

export type IBook = {
	_id?: string;
	title: string;
	author: string;
	genre: string;
	publisher: string;
	language: string;
	pages: number;
	rating: number;
	description: string;
	cover_image: string;
	keynotes: string[];
	publication_date: string;
	added_by: string | IUser;
};

