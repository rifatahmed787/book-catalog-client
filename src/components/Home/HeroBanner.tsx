import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
	const navigate = useNavigate();

	return (
		<div className="p-4 ">
			{/* Title */}
			<h1
				className=" text-[#3C3C3C] text-center font-anton text-[70px] md:text-[111px]  font-normal leading-[70px] md:leading-[140px] letter-spacing 
            tracking-[-2.82px]   max-w-[1170px] mx-auto"
			>
				Explore Our Book Catalog Today!
			</h1>

			{/* tage */}
			<p className="text-[#222] text-center font-inter text-lg  mt-3 md:mt-6 ">
				Books are the keys to knowledge, imagination, and
				endless possibilities.
			</p>

			<div className="relative  mt-[30px] md:mt-[78px] flex items-center justify-center ">
				<img
					src={
						"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					}
					alt=""
					className=" w-full h-[250px] md:w-[784px] md:h-[327px] object-cover "
				/>

				{/* Button */}

				<Button
					title="Start reading"
					className=" absolute -top-5 md:-top-10 bg-[#FE8159]"
					onClickHandler={() => navigate("/books")}
				/>
			</div>
		</div>
	);
};

export default HeroBanner;

