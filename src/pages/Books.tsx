import BooksList from "@/components/Books/BooksList";

const Books = () => {
  return (
    <div>
      {/* Title */}
      <h1
        className=" text-primary text-center font-anton text-xl md:text-7xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]  my-5 "
      >
        Books List
      </h1>

      {/* Books list  */}
      <BooksList />
    </div>
  );
};

export default Books;
