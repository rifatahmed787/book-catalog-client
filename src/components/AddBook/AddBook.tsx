import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import AddBookForm from "./AddBookForm";
import { useContext } from "react";

const AddBook = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`min-h-[90vh] py-10  w-full flex justify-center ${
        darkMode ? "bg-black" : "bg-box-pattern"
      }`}
    >
      <AddBookForm />
    </div>
  );
};

export default AddBook;
