"use client";

import ICONS from "@/shared/AllIcons";
import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "../ui/Button";
import WriteReviewForm from "./WriteReviewForm";
import { IBook } from "@/types/Book";

export default function AddReviewModal({
	book_info,
}: {
	book_info: IBook | undefined;
}) {
	const [openModal, setOpenModal] = useState<string | undefined>();
	const props = { openModal, setOpenModal };

	return (
		<>
			<Button
				title="Write a review"
				className=" mt-7 text-white text-base  font-semibold bg-[#000]  px-[40px] md:px-[40px]  py-[10px]  md:py-[15px] "
				icon={ICONS.chat_icon}
				onClickHandler={() => props.setOpenModal("pop-up")}
			/>

			<Modal
				show={props.openModal === "pop-up"}
				size="lg"
				popup
				onClose={() => props.setOpenModal(undefined)}
			>
				<Modal.Header className="">
					<h1
						className="px-7 text-[#000]   font-anton  text-[20px] md:text-[30px]   font-normal 
                      leading-[30px] md:leading-[50px]  letter-spacing  text-center  "
					>
						Add a review
					</h1>
				</Modal.Header>
				<Modal.Body className=" px-0">
					<WriteReviewForm book_info={book_info} />
				</Modal.Body>
			</Modal>
		</>
	);
}

