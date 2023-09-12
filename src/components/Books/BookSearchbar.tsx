import { useState, useEffect } from "react";
import TextInput from "../ui/form_items/TextInput";

const BookSearchbar = ({
  current_value,
  handleFilterValue,
}: {
  current_value: string;
  handleFilterValue: (value: string) => void;
}) => {
  const [serch_key, setSerchKey] = useState("");

  useEffect(() => {
    setSerchKey(current_value);
  }, [current_value]);

  return (
    <div className="relative flex items-center ">
      <TextInput
        type="text"
        placeHolder="Search"
        currentValue={serch_key}
        onChange={(e) => {
          setSerchKey(e.target.value);
        }}
        required={true}
        className="pr-10"
      />
      <button
        className="hover:bg-primary text-black h-[44px] px-2 py-1  rounded-r-md  hover:text-white -ml-10 z-10"
        onClick={() => handleFilterValue(serch_key)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default BookSearchbar;
