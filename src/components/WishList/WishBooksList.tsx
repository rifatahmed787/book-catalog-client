/* eslint-disable react-hooks/exhaustive-deps */
import BookListSkeleton from "./BookListSkeleton";
import { useGetWishListQuery } from "@/redux/features/wish/wishApi";
import { IWish } from "@/types/Wish";
import BookCard3 from "../ui/BookCard3";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { useContext } from "react";

export default function WishBooksList() {
  const { darkMode } = useContext(DarkModeContext);
  // Get books query
  const { data: books, isLoading, isError, error } = useGetWishListQuery({});

  const books_list_data = books?.data;

  return (
    <div
      className={`bg-[#FAF9F5] min-h-[70vh] px-4  py-10 ${
        darkMode ? "bg-black" : ""
      }`}
    >
      <div className=" max-w-[1170px] mx-auto">
        {books_list_data?.length > 0 ? (
          ""
        ) : (
          <>
            <h1
              className={`text-xl text-center font-bold ${
                darkMode ? "text-gray-300" : ""
              }`}
            >
              WishList is <span className="text-primary">Empty!</span>
            </h1>
          </>
        )}
        {/* Books list  */}
        {isLoading ? (
          <BookListSkeleton />
        ) : (
          <div className=" mt-10 w-full   grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
            {!isError &&
              !error &&
              books_list_data?.length > 0 &&
              books_list_data.map((book: IWish) => {
                return <BookCard3 key={book._id} wish_book={book} />;
              })}
          </div>
        )}
      </div>
    </div>
  );
}
