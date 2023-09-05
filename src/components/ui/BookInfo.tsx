import ICONS from "@/shared/AllIcons";
import Button from "./Button";
// import { Accordion } from "flowbite-react";
import { IBook } from "@/types/Book";
import AddReviewModal from "../BookDetails/AddReviewModal";
import { useAppSelector } from "@/hooks/reduxHook";
import RatingPicker from "./form_items/RatingPicker";
import { useNavigate } from "react-router-dom";
import { useAddBookInReadingListMutation } from "@/redux/features/reading/readingApi";
import { useEffect, useState } from "react";
import { get_error_messages } from "@/lib/error_messages";
import ToastContainer from "./Toast";

const BookInfo = ({ book_info }: { book_info: IBook | undefined }) => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // add in reading  list  mutation
  const [
    addBookInReadingList,
    {
      data: addInToReadData,
      isLoading: isAddToReadLoading,
      isError: isAddIntoReadError,
      error: addIntoReadError,
      isSuccess: isAddIntoReadSuccess,
    },
  ] = useAddBookInReadingListMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  //Addin to readlist handler
  const addInToReadListHandler = () => {
    isLoggedIn
      ? addBookInReadingList({
          book_id: book_info?._id,
          user_id: user?._id,
        })
      : navigate("/auth/signin");
  };

  // Error message
  useEffect(() => {
    if (isAddIntoReadError && addIntoReadError && "data" in addIntoReadError) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(addIntoReadError);
      setAlertMessages(error_messages);
    } else if (isAddIntoReadSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(addInToReadData?.message);
    }
  }, [
    isAddIntoReadError,
    addIntoReadError,
    isAddIntoReadSuccess,
    addInToReadData?.message,
  ]);

  return (
    <div className="h-full w-full min-h-[200px] border-[5px] border-white bg-[#EAE3D1] p-9">
      {/* title */}
      <h2 className=" text-primary font-anton text-[40px] font-normal leading-[50px]">
        {book_info?.title}
      </h2>
      {/* ratings */}
      <div className="flex items-center justify-start mt-5">
        <RatingPicker current_value={book_info?.rating as number} />
      </div>
      {/* Description */}
      <div className=" mt-7">
        <p className="text-primary text-[20px] font-inter font-medium leading-[30px]">
          DESCRIPTION :
        </p>

        <p className="text-[#656565] text-[16px] font-inter font-medium leading-[25px] mt-[6px]">
          {book_info?.description}
        </p>
      </div>

      {/* Main button */}
      <div className="flex items-center justify-between flex-wrap gap-5">
        <Button
          title="Read Now"
          className=" mt-7 text-primary text-base  font-semibold border border-black hover:bg-primary hover:text-white duration-300 hover:border-primary  px-[40px] md:px-[40px]  py-[10px]  md:py-[15px] "
          onClickHandler={addInToReadListHandler}
          icon={isAddToReadLoading ? ICONS.button_loading_icon : undefined}
        />
        {isLoggedIn && <AddReviewModal book_info={book_info} />}
      </div>
      {/* Key notes */}
      {/* <Accordion className="mt-40px divide-[#000] pb-10">
				<Accordion.Panel className="  ">
					<Accordion.Title
						className="text-[#000] text-[20px] font-inter font-medium leading-[30px] px-0 
                    hover:bg-transparent bg-transparent outline-none focus:ring-0"
					>
						What is Flowbite?
					</Accordion.Title>
					<Accordion.Content className="px-0 py-0   border border-[#000] p-4">
						<p className="text-[#656565] text-[16px] font-inter font-medium leading-[25px]   ">
							Flowbite is an open-source
							library of interactive
							components built on top of
							Tailwind CSS including buttons,
							dropdowns, modals, navbars, and
							more.
						</p>
					</Accordion.Content>
				</Accordion.Panel>
				<Accordion.Panel className="  ">
					<Accordion.Title
						className="text-[#000] text-[20px] font-inter font-medium leading-[30px] px-0 
                    hover:bg-transparent bg-transparent outline-none focus:ring-0"
					>
						What is Flowbite?
					</Accordion.Title>
					<Accordion.Content className="px-0 py-0   border border-[#000] p-4">
						<p className="text-[#656565] text-[16px] font-inter font-medium leading-[25px]   ">
							Flowbite is an open-source
							library of interactive
							components built on top of
							Tailwind CSS including buttons,
							dropdowns, modals, navbars, and
							more.
						</p>
					</Accordion.Content>
				</Accordion.Panel>
				<Accordion.Panel className="  ">
					<Accordion.Title
						className="text-[#000] text-[20px] font-inter font-medium leading-[30px] px-0 
                    hover:bg-transparent bg-transparent outline-none focus:ring-0"
					>
						What is Flowbite?
					</Accordion.Title>
					<Accordion.Content className="px-0 py-0   !border border-[#000] p-4">
						<p className="text-[#656565] text-[16px] font-inter font-medium leading-[25px]   ">
							Flowbite is an open-source
							library of interactive
							components built on top of
							Tailwind CSS including buttons,
							dropdowns, modals, navbars, and
							more.
						</p>
					</Accordion.Content>
				</Accordion.Panel>
			</Accordion> */}

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className="absolute  top-20 z-50 left-0 right-0 mx-auto flex justify-center"
        />
      )}
    </div>
  );
};

export default BookInfo;
