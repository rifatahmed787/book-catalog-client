import ICONS from "@/shared/AllIcons";
import { IReview } from "@/types/Review";
import { IUser } from "@/types/User";
import RatingPicker from "./form_items/RatingPicker";

export default function ReviewCard({ review }: { review: IReview }) {
	const reviewed_by = review?.reviewed_by as IUser;
	return (
		<div className="border border-[#000] px-10 py-7 max-w-[478px] min-h-[232px] ">
			<div className="flex items-center justify-between gap-8">
				{/* <Avatar
					alt="avatar of Jese"
					img="/images/people/profile-picture-5.jpg"
					rounded
				/> */}

				<div className="flex items-center justify-start gap-5">
					<span className=" p-3 w-14 h-14 rounded-full shadow-md flex items-center justify-center text-lg">
						{ICONS.profile}
					</span>

					<p className="text-[#202020]  text-[20px] font-inter font-normal leading-[38px]">
						{reviewed_by?.name?.firstName}
					</p>
				</div>
				<RatingPicker
					current_value={review?.rating as number}
				/>
			</div>

			<div className="mt-6">
				<p className="text-[#202020]  text-[20px] font-inter font-normal leading-[38px] ">
					{review?.review?.length > 200
						? review?.review.substring(0, 180) +
						  "..."
						: review?.review}
				</p>
			</div>
		</div>
	);
}

