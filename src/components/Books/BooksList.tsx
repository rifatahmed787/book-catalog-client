/* eslint-disable react-hooks/exhaustive-deps */
import { useGetBooksQuery } from "@/redux/features/book/bookApi";
import FilterBook from "./FilterBook";
import { IBook } from "@/types/Book";
import BookCard2 from "../ui/BookCard2";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookListSkeleton from "./BookListSkeleton";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { useContext } from "react";

export default function BooksList() {
  const { darkMode } = useContext(DarkModeContext);
  // params
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // filter state and effect for update
  const [filter, setFilter] = useState({
    year: "",
    genre: "",
    search: "",
  });

  useEffect(() => {
    const tempSearchParams = {
      year: searchParams.get("year") ?? "",
      genre: searchParams.get("genre") ?? "",
      search: searchParams.get("search") ?? "",
    };

    setFilter(tempSearchParams);
  }, [location]);

  // Get books query
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useGetBooksQuery({
    publication_date: filter.year,
    genre: filter.genre,
    searchTerm: filter.search,
  });

  const books_lis_data = books?.data?.data;

  return (
    <div
      className={`bg-[#FAF9F5] min-h-[70vh] px-4  py-20 ${
        darkMode ? "bg-black" : ""
      }`}
    >
      <div className=" max-w-[1170px] mx-auto">
        {/* Filter & and add book button */}

        <FilterBook filter={filter} setFilter={setFilter} />

        {/* Books list  */}
        {isLoading ? (
          <BookListSkeleton />
        ) : (
          <div className=" mt-20 w-full   grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
            {!isError &&
              !error &&
              books_lis_data?.length > 0 &&
              books_lis_data.map((book: IBook) => {
                return <BookCard2 key={book._id} book={book} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
}
