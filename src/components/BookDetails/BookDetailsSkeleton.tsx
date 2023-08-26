import ICONS from "@/shared/AllIcons";

const BookDetailsSkeleton = () => {
	return (
		<div className="max-w-[1170px] mx-auto grid  grid-cols-1 md:grid-cols-2  animate-pulse  ">
			{/*Book Image Carousel */}

			<div className="border-y border-l border-[#000000]  max-h-[500px] overflow-hidden ">
				<div className=" w-full aspect-square bg-slate-700  " />
			</div>
			{/* Book Info */}
			<div>
				<div className="h-full w-full min-h-[200px] border border-[#000000] bg-[#EAE3D1] p-9">
					<div className=" flex flex-col gap-4 flex-grow mb-16 ">
						<div className="h-8 bg-slate-700 rounded"></div>

						{/* ratings */}
						<div className="flex items-center justify-start my-5">
							<span className="text-[#FE8159]">
								{ICONS.star_icon}
							</span>
							<span className="text-white">
								{ICONS.star_icon}
							</span>
							<span className="text-white">
								{ICONS.star_icon}
							</span>
							<span className="text-white">
								{ICONS.star_icon}
							</span>
							<span className="text-white">
								{ICONS.star_icon}
							</span>
						</div>
						<div className="h-6 w-[90%] bg-slate-700 rounded"></div>
						<div className="h-6 w-[80%] bg-slate-700 rounded"></div>
						<div className="h-6 w-[70%] bg-slate-700 rounded"></div>
					</div>

					<div className=" mt-10 h-10 w-[50%] bg-slate-700 rounded"></div>
				</div>
			</div>
		</div>
	);
};

export default BookDetailsSkeleton;

