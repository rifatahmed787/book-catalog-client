import { ICart } from "@/types/Cart";
import { IBook } from "@/types/Book";

const CheckOutCard = ({ cart_book }: { cart_book?: ICart }) => {
  const book: IBook | undefined = cart_book?.book_id as IBook | undefined;

  return (
    <>
      <div className="flex flex-col rounded-lg  sm:flex-row">
        <img
          className="m-2 h-24 w-28 rounded-md border object-cover object-center"
          src={book?.cover_image}
          alt=""
        />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{book?.title}</span>
          <span className="float-right text-gray-400">{book?.author}</span>
          <p className="text-lg font-bold">${book?.price}</p>
        </div>
      </div>
    </>
  );
};

export default CheckOutCard;
