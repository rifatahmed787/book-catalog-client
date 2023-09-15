import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import Cart from "@/components/Shop/ShoppingCart/Cart";
import { useContext } from "react";

const AddToCart = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${darkMode ? "bg-black pt-1" : ""}`}>
      {/* Title */}
      <h1
        className=" text-primary text-center font-anton text-xl md:text-7xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]  my-5 "
      >
        Cart
      </h1>

      {/* cart list  */}
      <Cart />
    </div>
  );
};

export default AddToCart;
