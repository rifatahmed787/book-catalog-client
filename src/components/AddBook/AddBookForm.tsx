/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../ui/Button";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState } from "react";
import ToastContainer from "../ui/Toast";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";
import TextArea from "../ui/form_items/TextArea";
import { useAppSelector } from "@/hooks/reduxHook";
import { useAddBookMutation } from "@/redux/features/book/bookApi";
import RatingPicker from "../ui/form_items/RatingPicker";
import FileInput from "../ui/form_items/FileInput";
import { useUploderMutation } from "@/redux/features/upload/uploadApi";

const AddBookForm = () => {
  // user details
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  // Add book mutation hook
  const [addBok, { data: new_book_data, isError, error, isSuccess }] =
    useAddBookMutation();
  const [uploader, { isError: uploadError, error: uploadingError }] =
    useUploderMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  // form state
  const [book_form, setBookForm] = useState({
    title: "",
    author: "",
    genre: "",
    publisher: "",
    language: "",
    pages: 0,
    cover_image: "",
    rating: 1,
    description: "",
    keynotes: [""],
    publication_date: "",
    added_by: "",
  });

  // file state
  const [file, setFile] = useState<File | undefined>();

  // formSubmitHandler
  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = "";
    if (file) {
      console.log("this is the file data", file);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const uploadResponse = await uploader({ data: formData });
        console.log("this is the url data", uploadResponse);
        if (uploadResponse) {
          if ("data" in uploadResponse) {
            imageUrl = uploadResponse.data.images[0];
          } else {
            console.error("Upload error:", uploadResponse.error);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    const book_data = { ...book_form };

    // the properties of book_data
    book_data.added_by = user?._id as string;
    book_data.pages = Number(book_data.pages);
    book_data.rating = Number(book_data.rating);

    // the cover_image property
    const book_data_with_cover_image = {
      ...book_data,
      cover_image: imageUrl,
    };

    addBok(book_data_with_cover_image);
    setIsLoading(false);
  };

  // Input handler
  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    if (key == "keynotes") {
      setBookForm((prev) => ({
        ...prev,
        [key]: e.target.value.split(","),
      }));
    } else {
      setBookForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    }
  };

  // error and success handling
  useEffect(() => {
    if (isError && error && "data" in error) {
      setIsAlertOpen(true);
      setAlertType("error");
      const error_messages = get_error_messages(error);
      setAlertMessages(error_messages);
    } else if (isSuccess) {
      setIsAlertOpen(true);
      setAlertType("success");
      setAlertMessages(new_book_data?.message);
    }
  }, [error, isError, isSuccess]);
  useEffect(() => {
    if (uploadError && uploadingError) {
      setIsAlertOpen(true);
      setAlertType("error");
    }
  });

  return (
    <form
      onSubmit={formSubmitHandler}
      className="my-4 mx-5 md:mx-0 flex max-w-lg rounded-xl w-full flex-col gap-4 bg-[#FFFFFF] px-7 md:px-14 py-6"
    >
      <h1
        className="text-primary font-anton text-[20px] md:text-[30px] font-normal 
                      leading-[30px] md:leading-[50px] letter-spacing text-center"
      >
        Add new book
      </h1>
      <div className="space-y-6 block relative">
        {/* Title */}
        <TextInput
          type="text"
          placeHolder=""
          currentValue={book_form.title}
          onChange={(e) => inputChangeHandler(e, "title")}
          required={true}
          id="title"
          htmlFor="title"
          label="Title"
        />
        {/* Author */}
        <TextInput
          type="text"
          placeHolder=""
          currentValue={book_form.author}
          onChange={(e) => inputChangeHandler(e, "author")}
          required={true}
          id="author"
          htmlFor="author"
          label="Author"
        />
        {/* Genre */}
        <TextInput
          type="text"
          placeHolder=""
          currentValue={book_form.genre}
          onChange={(e) => inputChangeHandler(e, "genre")}
          required={true}
          id="genre"
          htmlFor="genre"
          label="Genre"
        />

        {/* Publisher */}
        <TextInput
          type="text"
          placeHolder=""
          currentValue={book_form.publisher}
          onChange={(e) => inputChangeHandler(e, "publisher")}
          required={true}
          id="publisher"
          htmlFor="publisher"
          label="Publisher"
        />

        {/* Language  & Pages */}
        <div className="grid grid-cols-2 gap-5">
          {/* Language */}
          <TextInput
            type="text"
            placeHolder=""
            currentValue={book_form.language}
            onChange={(e) => inputChangeHandler(e, "language")}
            required={true}
            id="language"
            htmlFor="language"
            label="Language"
          />

          {/* Pages */}
          <TextInput
            type="number"
            placeHolder=""
            currentValue={book_form.pages}
            onChange={(e) => inputChangeHandler(e, "pages")}
            required={true}
            id="pages"
            htmlFor="pages"
            label="Page Number"
          />
        </div>
        {/* Description */}
        <TextArea
          placeHolder="Description"
          currentValue={book_form.description}
          onChange={(e) => inputChangeHandler(e, "description")}
          required={true}
        />
        {/* key_notes */}

        <TextArea
          placeHolder="Key notes; Note: By comma separator, you can add multiple notes"
          currentValue={book_form.keynotes.join(",")}
          onChange={(e) => inputChangeHandler(e, "keynotes")}
          required={true}
        />

        {/* Cover Image */}
        <FileInput
          label=""
          onChange={(selectedFile) => {
            console.log("Selected file:", selectedFile);
            setFile(selectedFile);
          }}
          currentFile={file}
          placeholder="Choose an image"
          required
          id="image"
          htmlFor="image"
          currentValue={""}
        />

        {/* Publication Date */}
        <TextInput
          type="date"
          placeHolder=""
          currentValue={book_form.publication_date}
          onChange={(e) => inputChangeHandler(e, "publication_date")}
          required={true}
          id="publicationdate"
          htmlFor="publicationdate"
          label="Publication Date"
        />

        {/* Rating */}
        <RatingPicker
          current_value={book_form.rating}
          clickHandler={(value) =>
            setBookForm((prev) => ({
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
        className="bg-primary w-full mx-auto py-[17px] md:py-[10px] px-10 md:px-14 
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
          className="max-w-xs w-full absolute top-48 right-0 flex justify-center z-50"
        />
      )}
    </form>
  );
};

export default AddBookForm;
