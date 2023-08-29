/* eslint-disable react-hooks/exhaustive-deps */
import { get_error_messages } from "@/lib/error_messages";
import { useAddBookInWishMutation } from "@/redux/features/wish/wishApi";
import ICONS from "@/shared/AllIcons";
import { IBook } from "@/types/Book";
import { useEffect, useState } from "react";
import ToastContainer from "./Toast";
import { useAppSelector } from "@/hooks/reduxHook";
import { useAddBookInReadingListMutation } from "@/redux/features/reading/readingApi";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const BookCard2 = ({ book }: { book: IBook }) => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const [isLoveHovered, setIsLoveHovered] = useState(false);
  const [isViewHovered, setIsViewHovered] = useState(false);
  const [isCompareHovered, setIsCompareHovered] = useState(false);
  const navigate = useNavigate();

  // add in wish mutation hook
  const [
    addBookInWish,
    {
      data: addToWishData,
      isLoading: isAddToWisLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useAddBookInWishMutation();

  // add in reading  list  mutation
  const [
    addBookInReadingList,
    {
      data: addInToReadData,
      isLoading: isAddToReadLoading,
      isError: isAddIntoReadError,
      error: addIntoReadError,
      isSuccess: isAddIntoReadSuccess,
    },
  ] = useAddBookInReadingListMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  //wishListHandler
  const wishListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? addBookInWish({ book_id: book?._id, user_id: user?._id })
      : navigate("/auth/signin");
  };
  //Addin to readlist handler
  const addInToReadListHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? addBookInReadingList({
          book_id: book?._id,
          user_id: user?._id,
        })
      : navigate("/auth/signin");
  };

  //error and success handlaing
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(addToWishData?.message);
    }
  }, [error, isError, isSuccess]);
  useEffect(() => {
    if (isAddIntoReadError && addIntoReadError && "data" in addIntoReadError) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(addIntoReadError);
      setAlertMessages(error_messages);
    } else if (isAddIntoReadSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(addInToReadData?.message);
    }
  }, [isAddIntoReadError, addIntoReadError, isAddIntoReadSuccess]);

  // card Click Handler
  const cardClickHandler = () => {
    navigate(`/books/${book?._id}`);
  };

  return (
    <div
      className=" relative bg-white shadow-md w-[370px] overflow-hidden h-[498px] flex flex-col cursor-pointer "
      onClick={() => cardClickHandler()}
    >
      {/* Image */}

      <div className="group h-[300px] overflow-hidden border-[5px] border-white">
        <div className="block shadow-lg relative after:absolute after:content-normal group-hover:after:bg-black/60 after:left-0 after:top-0 after:w-full after:h-full after:duration-700">
          <img
            src={book?.cover_image}
            className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-300"
            alt=""
          />

          <div className="absolute left-0 right-0 top-16 z-30 transform -translate-x-1/2 transition duration-500 h-full group-hover:translate-x-5 delay-100">
            <div className="space-y-3">
              {/* wishlist button */}
              <button
                onClick={wishListHandler}
                onMouseEnter={() => setIsLoveHovered(true)}
                onMouseLeave={() => setIsLoveHovered(false)}
                className={`flex justify-center items-center gap-1 text-center  w-10 h-10 rounded-full overflow-hidden relative transition-all duration-300 hover:w-28 ${
                  isLoveHovered
                    ? "bg-primary text-white"
                    : "bg-white text-primary "
                }`}
              >
                {isAddToWisLoading ? (
                  ICONS.button_loading_icon
                ) : (
                  <>
                    {isLoveHovered ? (
                      <div className="flex items-center gap-1">
                        <Icon icon="mdi:heart" className="" />
                        <span>WishList</span>
                      </div>
                    ) : (
                      <Icon icon="mdi:heart" className="" />
                    )}
                  </>
                )}
              </button>

              {/* quick view button  */}
              <button
                onClick={() => cardClickHandler()}
                onMouseEnter={() => setIsViewHovered(true)}
                onMouseLeave={() => setIsViewHovered(false)}
                className={`flex justify-center items-center gap-1 text-center  w-10 h-10 rounded-full overflow-hidden relative transition-all duration-300 hover:w-28 ${
                  isViewHovered
                    ? "bg-primary text-white"
                    : "bg-white text-primary "
                }`}
              >
                {isAddToWisLoading ? (
                  ICONS.button_loading_icon
                ) : (
                  <>
                    {isViewHovered ? (
                      <div className="flex items-center gap-1">
                        <Icon icon="jam:search-plus" />
                        <span>Details</span>
                      </div>
                    ) : (
                      <Icon icon="jam:search-plus" />
                    )}
                  </>
                )}
              </button>

              {/* compare button */}
              <button
                onMouseEnter={() => setIsCompareHovered(true)}
                onMouseLeave={() => setIsCompareHovered(false)}
                className={`flex justify-center items-center gap-1 text-center  w-10 h-10 rounded-full overflow-hidden relative transition-all duration-300 hover:w-28 ${
                  isCompareHovered
                    ? "bg-primary text-white"
                    : "bg-white text-primary "
                }`}
              >
                {isAddToWisLoading ? (
                  ICONS.button_loading_icon
                ) : (
                  <>
                    {isCompareHovered ? (
                      <div className="flex items-center gap-1">
                        <Icon icon="ic:round-star" />
                        <span>Compare</span>
                      </div>
                    ) : (
                      <Icon icon="ic:round-star" />
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* other items */}
      <div className="mt-[18px]">
        {/* title & rating  */}
        <div className="flex items-center justify-between gap-5 px-4 ">
          <p className="text-primary font-inter  text-2xl font-medium    ">
            {book?.title} <span className="text-sm">by-{book.author}</span>
          </p>

          <p className="text-primary font-inter border-none text-xl text-right font-bold flex items-center gap-2 ">
            {Array.from({ length: book.rating }, (_, index) => (
              <span key={index}>{ICONS.star_icon}</span>
            ))}
            {book.rating}
          </p>
        </div>
        {/*  */}

        <div className="my-[27px] px-4 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            {book.publication_date}
          </p>
          <p className="text-[#3C3C3C] font-inter  text-base font-normal   ">
            pages: {book.pages}
          </p>
        </div>
      </div>

      {/* buttons*/}
      <div className="border-t border-primary h-14 px-4  flex items-center justify-between mt-auto">
        <button
          className="  px-6 py-1 text-white bg-primary font-inter  text-xm font-semibold flex items-center 
					gap-2  "
          onClick={addInToReadListHandler}
        >
          Start reading
          {isAddToReadLoading ? ICONS.button_loading_icon : ""}
        </button>
        <button className="text-xm text-primary hover:text-white hover:bg-primary duration-500 px-6 py-1 border ">
          ADD TO CART
        </button>
      </div>

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="absolute  top-0 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </div>
  );
};

export default BookCard2;
