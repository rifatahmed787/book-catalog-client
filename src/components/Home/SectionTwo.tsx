import banner from "../../assets/banner/section-two.jpg";

const SectionTwo = () => {
  return (
    <div className="my-10 max-w-[1170px] mx-auto p-4 relative  group ">
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary opacity-25 group-hover:w-[97.5%] group-hover:h-96"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 cursor-pointer "></span>
      <img src={banner} alt="" className="w-full bg-cover h-96 " />
    </div>
  );
};

export default SectionTwo;
