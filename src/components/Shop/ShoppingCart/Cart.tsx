import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import BrandButton from "@/components/BrandButton/BrandButton";
import { useGetCartBookQuery } from "@/redux/features/cart/cartApi";
import { ICart } from "@/types/Cart";
import CartCard from "@/components/ui/CartCard";
import ShopSkeleton from "../ShopSkeleton/ShopSkeleton";

const Cart = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { data: books, isError, isLoading, error } = useGetCartBookQuery({});
  const cart_list_data = books?.data;

  return (
    <div className={`pb-10 pt-1 ${darkMode ? "bg-black text-white" : ""}`}>
      {/* cart section */}
      <div
        className={`${
          darkMode
            ? "bg-gradient-backdrop text-white mx-10 rounded-md"
            : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto mt-10">
          <div className="flex flex-col lg:flex-row justify-center items-center shadow-md my-10">
            {/* cart item shows here  */}
            <div
              className={`w-11/12  lg:w-3/4 px-10 py-10 ${
                darkMode
                  ? "bg-gradient-backdrop text-white"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">3 Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>

              {/* book details */}
              <div className={`flex items-center  -mx-8 px-1 lg:px-6 py-5`}>
                <div className=" max-w-[1170px] mx-auto">
                  {cart_list_data?.length > 0 ? (
                    ""
                  ) : (
                    <>
                      <h1
                        className={`text-xl text-center font-bold ${
                          darkMode ? "text-gray-300" : ""
                        }`}
                      >
                        Cart is <span className="text-primary">Empty!</span>
                      </h1>
                    </>
                  )}

                  {isLoading ? (
                    <ShopSkeleton />
                  ) : (
                    <>
                      {!isError &&
                        !error &&
                        cart_list_data?.length > 0 &&
                        cart_list_data.map((book: ICart) => {
                          return (
                            <div
                              className={`mt-8 cursor-pointer ${
                                darkMode
                                  ? "hover:bg-none"
                                  : "hover:bg-gray-100 p-4"
                              }`}
                            >
                              <CartCard key={book._id} cart_book={book} />
                            </div>
                          );
                        })}
                    </>
                  )}
                </div>
              </div>

              <Link
                to="/"
                className="flex font-semibold text-primary text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-primary w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>

            {/* order summary starts from here */}
            <div id="summary" className="w-11/12 lg:w-1/4 px-8 py-10">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items 3</span>
                <span className="font-semibold text-sm">590$</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                />
              </div>
              {/* button for apply  */}
              <BrandButton text="Apply" icon="" />
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>$600</span>
                </div>
                <Link to="/checkout">
                  <button className="bg-primary hover:bg-brand duration-500 py-3 text-sm text-white uppercase w-full">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
