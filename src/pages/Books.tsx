import BooksList from "@/components/Books/BooksList";

const Books = () => {
	return (
		<div>
			{/* Title */}
			<h1
				className=" text-[#3C3C3C] text-center font-anton text-[70px] md:text-[141px]  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]  my-20 "
			>
				Books List
			</h1>

			{/* Books list  */}
			<BooksList />
		</div>
	);
};

export default Books;

