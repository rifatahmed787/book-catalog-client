import { useAppSelector } from "@/hooks/reduxHook";
import { get_error_messages } from "@/lib/error_messages";
import { useRemoveCartMutation } from "@/redux/features/cart/cartApi";
import { ICart } from "@/types/Cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastContainer from "./Toast";
import ICONS from "@/shared/AllIcons";
import { IBook } from "@/types/Book";

const CartCard = ({ cart_book }: { cart_book?: ICart }) => {
  const book: IBook | undefined = cart_book?.book_id as IBook | undefined;

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // add in wish mutation hook
  const [
    deleteBookFromCart,
    {
      data: removeFromCartData,
      isLoading: isRemoveCartLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useRemoveCartMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  //wishListHandler
  const CartRemoveHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    isLoggedIn
      ? deleteBookFromCart({
          _id: book?._id,
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
      setAlertMessages(removeFromCartData?.message);
    }
  }, [error, isError, isSuccess, removeFromCartData?.message]);

  return (
    <div className=" w-full  grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 ">
      <div className="flex ">
        <div className="">
          <img className="h-24 w-20" src={book?.cover_image} alt="" />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{book?.title}</span>
          <span className="font-bold text-sm">{book?.author}</span>
          <button
            className="font-semibold hover:text-red-500 text-gray-500 text-xs flex items-center"
            onClick={CartRemoveHandler}
          >
            Remove
            {isRemoveCartLoading ? ICONS.button_loading_icon : ""}
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
        <input
          className="mx-2 border text-center w-8 px-1 text-black"
          type="text"
          value="1"
          readOnly
        />
        <button>
          <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
        </button>
      </div>
      <span className="text-center w-2/5 font-semibold text-sm flex justify-center items-center">
        $ {book?.price}
      </span>

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="absolute  top-0 z-50 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </div>
  );
};

export default CartCard;
