import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { useContext } from "react";

const Blog = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${darkMode ? "bg-black pt-1" : ""}`}>
      {/* Title */}
      <h1
        className=" text-primary text-center font-anton text-xl md:text-7xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
                  tracking-[-2.82px]  my-5 "
      >
        Blogs
      </h1>

      {/* Books list  */}
    </div>
  );
};

export default Blog;
