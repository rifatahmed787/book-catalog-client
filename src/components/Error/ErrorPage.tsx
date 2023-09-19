import { Link } from "react-router-dom";
import "./ErrorPage.css";
import BrandButton from "../BrandButton/BrandButton";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h3 className="text-2xl font-display font-bold text-primary text-center pb-3 ">
          Error
        </h3>
        <h1 className="error text-4xl md:text-7xl text-center">404</h1>
        <div className="page text-xl py-7">Ooops!!! The page is not found</div>
        <Link to="/" className="back-home flex justify-center">
          <BrandButton text="Back to home" icon="" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
