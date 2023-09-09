import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="w-full flex justify-center items-center bg-primary min-h-screen">
      <div className="wrapper">
        <div className="book-loader-container">
          <div className="spine"></div>
          <div className="page-wrapper">
            <div className="page"></div>
          </div>
          <div className="page-wrapper">
            <div className="page"></div>
          </div>
          <div className="page-wrapper">
            <div className="page"></div>
          </div>
          <div className="page-wrapper">
            <div className="page"></div>
          </div>
          <div className="page-wrapper-static right">
            <div className="page"></div>
          </div>
          <div className="page-wrapper-static left">
            <div className="page"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
