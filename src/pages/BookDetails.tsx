import FullBookDetails from "@/components/BookDetails/FullBookDetails";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { useContext } from "react";

const BookDetails = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${darkMode ? "bg-black" : ""}`}>
      <FullBookDetails />
    </div>
  );
};

export default BookDetails;
