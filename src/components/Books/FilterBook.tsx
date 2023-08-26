import { useAppSelector } from "@/hooks/reduxHook";
import Button from "../ui/Button";
import ICONS from "@/shared/AllIcons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FilterDropDown from "./FilterDropDown";
import { useGetUniqueFilteringItemsQuery } from "@/redux/features/book/bookApi";
import { useEffect } from "react";
import BookSearchbar from "./BookSearchbar";

type IFilterBook = {
	filter: { genre: string; year: string; search: string };
	setFilter: React.Dispatch<
		React.SetStateAction<{
			year: string;
			genre: string;
			search: string;
		}>
	>;
};
const FilterBook = ({ filter }: IFilterBook) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const { isLoggedIn } = useAppSelector((state) => state.auth);

	// Get books query
	const { data: unique_items } = useGetUniqueFilteringItemsQuery({
		refetchOnFocus: true,
	});

	const { all_genre = [], all_publication_date = [] } =
		unique_items?.data?.data || {};

	//
	useEffect;

	// Unique year
	const uniquePublicationYearsSet = new Set(
		all_publication_date.map((date: string) =>
			new Date(date).getFullYear()
		)
	);
	const uniquePublicationYears = Array.from(uniquePublicationYearsSet); // Convert Set to Array

	// unique genre
	const genresArray = all_genre.flatMap((genre: string) =>
		genre.split(", ")
	);
	const uniqueGenresSet = new Set(genresArray);
	const uniqueGenres = Array.from(uniqueGenresSet);

	//handleFilter
	type IHandleFilter = {
		key: string;
		value: string;
	};
	const handleFilter = ({ key, value }: IHandleFilter) => {
		searchParams.set(`${key}`, value);
		navigate(`/books?${searchParams.toString()}`);
	};

	return (
		<div className="flex flex-col sm:flex-row items:start md:items-center justify-between gap-4">
			<div className="flex  items-start md:items-center justify-start gap-4">
				{/* title */}
				<h1
					className=" text-[#000]   font-anton  text-[20px] md:text-[30px]   font-normal 
                      leading-[30px] md:leading-[50px]  letter-spacing flex-none  whitespace-nowrap  "
				>
					Filter By:
				</h1>
				{/* Filter Buttons */}
				<div className=" flex items-center justify-start flex-wrap gap-[10px]  ">
					<button
						className={[
							"h-8 px-6   rounded-3xl text-lg text-[#000] border border-[#000] text-center hover:bg-[#000] hover:text-white ",
						].join(" ")}
						onClick={() => {
							setSearchParams({});
							navigate(`/books`);
						}}
					>
						All
					</button>

					{/* Year */}
					<FilterDropDown
						header_label={
							filter.year
								? filter.year
								: "Year"
						}
						items={
							uniquePublicationYears as string[]
						}
						handleFilterValue={(value) => {
							handleFilter({
								key: "year",
								value,
							});
						}}
					/>

					{/* Genre */}
					<FilterDropDown
						header_label={
							filter.genre
								? filter.genre
								: "Genre"
						}
						items={uniqueGenres as string[]}
						handleFilterValue={(value) => {
							handleFilter({
								key: "genre",
								value,
							});
						}}
					/>
					{/* Search */}
					<BookSearchbar
						current_value={
							filter.search
								? filter.search
								: ""
						}
						handleFilterValue={(value) => {
							handleFilter({
								key: "search",
								value,
							});
						}}
					/>
				</div>
			</div>

			{isLoggedIn && (
				<div className="flex  justify-end">
					<Link to={"/add-book"}>
						<Button
							title="Add New Book"
							className=" bg-[#2B2321] px-[20px] md:px-[20px] py-[10px] md:py-[18px] "
							icon={ICONS.folder_plus}
						/>
					</Link>
				</div>
			)}
		</div>
	);
};

export default FilterBook;

