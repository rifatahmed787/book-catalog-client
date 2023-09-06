import logo from "@/assets/logo/logo.svg";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { useContext } from "react";

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const bookLinksAndTitles = [
    {
      website: "https://www.goodreads.com",
      title: "The Night Circus by Erin Morgenstern",
    },
    {
      website: "https://www.amazon.com/books",
      title: "Becoming by Michelle Obama",
    },
    {
      website: "https://www.barnesandnoble.com",
      title: "Educated by Tara Westover",
    },
    {
      website: "https://www.gutenberg.org",
      title: "Pride and Prejudice by Jane Austen",
    },
  ];

  const popularWritersWithWebsites = [
    {
      name: "J.K. Rowling",
      website: "https://www.jkrowling.com/",
    },
    {
      name: "Stephen King",
      website: "https://stephenking.com/",
    },
    {
      name: "George R.R. Martin",
      website: "https://georgerrmartin.com/",
    },
    {
      name: "Neil Gaiman",
      website: "http://www.neilgaiman.com/",
    },
    {
      name: "Haruki Murakami",
      website: "http://www.harukimurakami.com/",
    },
    {
      name: "Dan Brown",
      website: "https://danbrown.com/",
    },
    {
      name: "Margaret Atwood",
      website: "https://margaretatwood.ca/",
    },
    {
      name: "John Grisham",
      website: "https://www.jgrisham.com/",
    },
  ];

  return (
    <div
      className={`bg-[#bfc2b6] w-full  min-h-[370px] py-[35px]  md:py-[70px] ${
        darkMode ? "bg-dark" : ""
      }`}
    >
      <div className="max-w-[1170px] mx-auto bg-transparent px-4 flex flex-col md:flex-row gap-10 items-start justify-between ">
        {/* 1st part */}
        <div className="   w-full md:w-auto flex flex-col  gap-4 md:gap-8  items-center md:items-start justify-center md:justify-start">
          {/* logo */}
          <img className="w-1/2" src={logo} alt="" />
          {/* tag */}

          <p
            className={`text-gray-700 font-inter text-xl font-normal   leading-[40px] ${
              darkMode ? "text-white" : ""
            }`}
          >
            Today a <span className="text-primary">reader, </span>
            tomorrow a <span className="text-primary">leader.</span>
          </p>
          {/* Especial req */}
          <div className="   max-w-[600px] w-full md:w-[400px]  bg-white flex items-center justify-start">
            <p className=" flex-grow    w-full block text-[rgba(85, 85, 85, 0.68)] font-inter text-base font-normal px-4">
              See all latest books
            </p>
            <Button
              title="Start reading now"
              className=" flex-none py-3 md:py-4 px-4 md:px-7 bg-primary  cursor-pointer"
              onClickHandler={() => navigate("/books")}
            />
          </div>
        </div>

        {/* 2nd part */}
        <div className="grid  grid-cols-1 sm:grid-cols-2   content-center gap-[30px] md:gap-[78px]">
          <div className="flex flex-col gap-[30px]">
            <p
              className={`text-[#3B3B3B] font-inter text-base font-bold ${
                darkMode ? "text-gray-200" : ""
              }`}
            >
              Popular book collect
            </p>

            <ul className="flex flex-row md:flex-col gap-3 md:gap-[20px] flex-wrap md:flex-nowrap ">
              {bookLinksAndTitles?.map((item) => {
                return (
                  <Link to={item.website} target="_blank">
                    <li
                      className={`text-[#3B3B3B] font-inter text-base font-normal    max-w-[250px] ${
                        darkMode ? "text-gray-300" : ""
                      }`}
                    >
                      {item.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-[30px]">
            <p
              className={`text-[#3B3B3B] font-inter text-base font-bold ${
                darkMode ? "text-gray-200" : ""
              }`}
            >
              Writer
            </p>

            <ul className="flex flex-row md:flex-col gap-3 md:gap-[20px] flex-wrap md:flex-nowrap ">
              {popularWritersWithWebsites?.map((item) => {
                return (
                  <Link to={item.website} target="_blank">
                    <li
                      className={`text-[#3B3B3B] font-inter text-base font-normal    max-w-[250px] ${
                        darkMode ? "text-gray-300" : ""
                      }`}
                    >
                      {item.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
