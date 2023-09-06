import ContactUs from "@/components/ContactUs/ContactUs";
import { DarkModeContext } from "@/components/DarkModeContext/DarkModeContext";
import { useContext } from "react";

const Contact = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${darkMode ? "bg-black pt-1" : ""}`}>
      <h1
        className=" text-primary text-center font-anton text-xl md:text-7xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]  my-5 "
      >
        Contact Us
      </h1>
      <ContactUs />
    </div>
  );
};

export default Contact;
