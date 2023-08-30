/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import ToastContainer from "../ui/Toast";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";
import TextArea from "../ui/form_items/TextArea";
import { useAppSelector } from "@/hooks/reduxHook";
import { useAddBookReviewMutation } from "@/redux/features/review/reviewApi";
import { IBook } from "@/types/Book";
import RatingPicker from "../ui/form_items/RatingPicker";

const WriteReviewForm = ({ book_info }: { book_info: IBook | undefined }) => {
  // user details
  const { user } = useAppSelector((state) => state.auth);

  // Add book mutation hook
  const [
    addBookReview,
    { data: new_review_data, isLoading, isError, error, isSuccess },
  ] = useAddBookReviewMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  // form state
  const [review_form, setReviewForm] = useState({
    rating: 1,
    review: "",
    reviewed_by: user?._id,
    book_id: book_info?._id,
  });

  //formSubmitHandler
  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const review_data = review_form;
    review_data.rating = Number(review_form.rating);
    addBookReview(review_data);
  };

  // Input handler
  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    if (key == "keynotes") {
      setReviewForm((prev) => ({
        ...prev,
        [key]: e.target.value.split(","),
      }));
    } else {
      setReviewForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    }
  };

  //error and success handlaing
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(new_review_data?.message);
      setReviewForm((prev) => ({
        ...prev,
        review: "",
      }));
    }
  }, [error, isError, isSuccess]);

  return (
    <form
      onSubmit={formSubmitHandler}
      className="   flex   rounded-xl w-full  flex-col gap-4 bg-[#FFFFFF] px-7  py-6 "
    >
      <div className="   relative flex flex-col gap-6 ">
        {/* Review */}
        <TextArea
          placeHolder="Description"
          currentValue={review_form.review}
          onChange={(e) => inputChangeHandler(e, "review")}
          required={true}
        />

        {/* Rating */}
        {/* {/* Rating */}
        <RatingPicker
          current_value={review_form.rating as number}
          clickHandler={(value) =>
            setReviewForm((prev) => ({
              ...prev,
              ["rating"]: Number(value),
            }))
          }
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        title="Submit"
        className="  bg-primary  w-full mx-auto py-[17px] md:py-[10px] px-10 mmd:px-14   
					 text-base font-medium rounded"
        icon={isLoading && ICONS.button_loading_icon}
        isDisabled={isLoading}
      />

      {/* Toast */}
      {isAlertOpen && (
        <ToastContainer
          type={AlertType}
          messages={AlertMessages}
          isAlertOpen={isAlertOpen}
          setIsAlertOpen={setIsAlertOpen}
          className=" max-w-md w-full absolute -top-16  z-50 right-0 left-0 mx-auto flex justify-center"
        />
      )}
    </form>
  );
};

export default WriteReviewForm;
