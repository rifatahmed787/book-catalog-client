import ReadingBooksList from "@/components/ReadingList/ReadingBooksList";

const ReadingList = () => {
  return (
    <div>
      {/* Title */}
      <h1
        className=" text-primary text-center font-anton text-xl md:text-7xl  font-normal leading-[70px] md:leading-[140px] letter-spacing 
				tracking-[-2.82px]  my-5 "
      >
        Reading List
      </h1>

      {/* Books list  */}
      <ReadingBooksList />
    </div>
  );
};

export default ReadingList;
