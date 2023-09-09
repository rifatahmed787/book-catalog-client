import { useGetBestSellerBooksQuery } from "@/redux/features/book/bookApi";

import Button from "../ui/Button";
import BooksCarouselSkeleton from "./BookCarouselSkeleton";
import { useNavigate } from "react-router-dom";
import { IBook } from "@/types/Book";
import BookCard1 from "../ui/BookCard1";

const BestsellerBooks = () => {
  const navigate = useNavigate();
  // Get books query
  const {
    data: books,
    isLoading,
    // isError,
    // error,
  } = useGetBestSellerBooksQuery({});

  const books_list_data = books?.data;

  return (
    <div className="max-w-[1170px] overflow-hidden mx-auto p-4">
      <div
        className="flex flex-col sm:flex-row items-center  sm:justify-between
			gap-6 sm:gap-20"
      >
        <h1 className="text-primary font-anton text-[20px] md:text-[40px] font-normal leading-[50px] relative after:absolute after:content-normal after:bg-primary after:w-full after:h-0.5 after:bottom-2">
          Best Seller Preview
        </h1>
        <Button
          title="All Books"
          className="px-[20px] md:px-[40px] py-[10px] md:py-[20px] bg-primary"
          onClickHandler={() => navigate("/books")}
        />
      </div>
      <div className="mt-10 md:mt-14">
        {isLoading ? (
          <BooksCarouselSkeleton />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-items-center">
              {books_list_data?.length &&
                books_list_data?.map((book: IBook) => (
                  <BookCard1 book={book} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BestsellerBooks;
