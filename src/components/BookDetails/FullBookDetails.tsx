import { useParams } from "react-router-dom";
import BookImagesCarousel from "../ui/BookImagesCarousel";
import BookInfo from "../ui/BookInfo";
import ReviewSection from "./ReviewSection";
import { useGetBookDetailsQuery } from "@/redux/features/book/bookApi";
import { useEffect, useState, useContext } from "react";
import { IBook } from "@/types/Book";
import BookDetailsSkeleton from "./BookDetailsSkeleton";
import { useAppSelector } from "@/hooks/reduxHook";
import { IUser } from "@/types/User";
import BookOwnerButtons from "./BookOwnerButtons";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";

const FullBookDetails = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { bookID } = useParams();

  // user state from redux
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  //bookDetailsSkip state
  const [bookDetailsSkip, setBookDetailsSkip] = useState(true);
  useEffect(() => {
    if (bookID) {
      setBookDetailsSkip(false);
    }
  }, [bookID]);

  // Get books query
  const {
    data: book_details_data,
    isLoading,
    isError,
    // error,
  } = useGetBookDetailsQuery(bookID, { skip: bookDetailsSkip });

  const book_details: IBook = book_details_data?.data;
  const book_added_by: IUser = book_details?.added_by as IUser;

  return (
    <div
      className={`min-h-screen bg-[#FAF9F5] w-full py-8 md:py-20 ${
        darkMode ? "bg-black" : ""
      }`}
    >
      {!isLoading &&
        !isError &&
        isLoggedIn &&
        user?._id === book_added_by?._id && (
          <BookOwnerButtons book_info={book_details} />
        )}

      {isLoading ? (
        <BookDetailsSkeleton />
      ) : (
        <div className="max-w-[1170px] mx-auto grid shadow-lg grid-cols-1 md:grid-cols-2  ">
          {/*Book Image Carousel */}

          <div className="  max-h-[500px] ">
            <BookImagesCarousel images={[book_details?.cover_image]} />
          </div>
          {/* Book Info */}
          <div>
            <BookInfo book_info={book_details} />
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className=" mt-[70px] md:mt-[140px]">
        <ReviewSection book_details={book_details} />
      </div>
    </div>
  );
};

export default FullBookDetails;
