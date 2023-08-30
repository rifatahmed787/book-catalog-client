"use client";

import ICONS from "@/shared/AllIcons";
import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "../ui/Button";

type IDeleteBookModal = {
  delete_book_handler: () => void;
  isLoading: boolean;
};

export default function DeleteBookModal({
  delete_book_handler,
  isLoading,
}: IDeleteBookModal) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button
        title="Delete Book"
        className=" bg-primary px-[20px] md:px-[40px] py-[10px] md:py-[18px] "
        icon={ICONS.delete_icon}
        onClickHandler={() => props.setOpenModal("pop-up")}
      />

      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this book?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                title="Yes, I'm sure"
                onClickHandler={() => {
                  delete_book_handler();
                  props.setOpenModal(undefined);
                }}
                className="px-4 py-1 md:px-4 md:py-1 bg-red-600
                                 text-white text-base font-medium rounded-md "
                icon={isLoading ? ICONS.button_loading_icon : undefined}
              />

              <Button
                title="	No, cancel"
                onClickHandler={() => props.setOpenModal(undefined)}
                className="px-4 py-1 md:px-4 md:py-1 bg-primary
                                 text-white text-base font-medium rounded-md "
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
