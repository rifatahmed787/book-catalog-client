import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { useContext } from "react";
import AddBlogForm from "./AddBlogForm";

const AddBlog = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`min-h-[90vh] py-10  w-full flex justify-center ${
        darkMode ? "bg-black" : "bg-box-pattern"
      }`}
    >
      <AddBlogForm />
    </div>
  );
};

export default AddBlog;
