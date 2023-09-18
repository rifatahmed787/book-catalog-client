/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../ui/Button";
import TextInput from "../ui/form_items/TextInput";
import { useContext, useEffect, useState } from "react";
import ToastContainer from "../ui/Toast";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";
import TextArea from "../ui/form_items/TextArea";
import { useUploderMutation } from "@/redux/features/upload/uploadApi";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { useCreateBlogMutation } from "@/redux/features/Blog/blogApi";
import { useAppSelector } from "@/hooks/reduxHook";
import MultipleFileInput from "../ui/form_items/MultipleFileInput";

const AddBlogForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useAppSelector((state) => state.auth);
  // user details
  const [isLoading, setIsLoading] = useState(false);
  // Add book mutation hook
  const [addBlog, { data: new_book_data, isError, error, isSuccess }] =
    useCreateBlogMutation();
  const [uploader, { isError: uploadError, error: uploadingError }] =
    useUploderMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  // form state
  const [blog_form, setBlogForm] = useState({
    title: "",
    image: [""],
    description: "",
    tags: [""],
    added_by_id: "",
    name: "",
    profile: "",
  });

  // file state
  const [files, setFiles] = useState<File[]>([]);

  // formSubmitHandler
  const formSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const imageUrls: string[] = [];

    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }

      try {
        const uploadResponse = await uploader({ data: formData });
        console.log("this is the url data", uploadResponse);
        if (uploadResponse && "data" in uploadResponse) {
          imageUrls.push(...uploadResponse.data.images); // Append the new image URLs to the array
        } else {
          console.error("Upload error:", uploadResponse?.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    const blog_data = { ...blog_form };

    // the properties of book_data
    blog_data.added_by_id = user?._id as string;
    blog_data.profile = user?.imageUrl as string;

    // the cover_image property
    const blog_data_with_cover_image = {
      ...blog_data,
      image: imageUrls,
    };
    console.log(blog_data_with_cover_image);
    addBlog(blog_data_with_cover_image);
    setIsLoading(false);
  };

  // Input handler
  const inputChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    if (key == "tags") {
      setBlogForm((prev) => ({
        ...prev,
        [key]: e.target.value.split(","),
      }));
    } else {
      setBlogForm((prev) => ({
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
      className={`my-4 mx-5 md:mx-0 flex max-w-lg rounded-xl w-full flex-col gap-4 bg-[#FFFFFF] px-7 md:px-14 py-6 ${
        darkMode ? "bg-gradient-backdrop" : ""
      }`}
    >
      <h1
        className="text-primary font-anton text-[20px] md:text-[30px] font-normal 
                      leading-[30px] md:leading-[50px] letter-spacing text-center"
      >
        Add new Blog
      </h1>
      <div className="space-y-6 block relative">
        {/* Title */}
        <TextInput
          type="text"
          placeHolder=""
          currentValue={blog_form.title}
          onChange={(e) => inputChangeHandler(e, "title")}
          required={true}
          id="title"
          htmlFor="title"
          label="Title"
        />
        <TextInput
          type="text"
          placeHolder=""
          currentValue={blog_form.name}
          onChange={(e) => inputChangeHandler(e, "name")}
          required={true}
          id="name"
          htmlFor="name"
          label="Your Name"
        />
      </div>
      {/* Description */}
      <TextArea
        placeHolder="Description"
        currentValue={blog_form.description}
        onChange={(e) => inputChangeHandler(e, "description")}
        required={true}
      />
      {/* key_notes */}

      <TextArea
        placeHolder="Key tags; Note: By comma separator, you can add multiple tags"
        currentValue={blog_form.tags.join(",")}
        onChange={(e) => inputChangeHandler(e, "tags")}
        required={true}
      />

      {/* Cover Image */}

      <MultipleFileInput
        label=""
        onChange={(selectedFiles) => {
          if (selectedFiles) {
            const fileArray = Array.from(selectedFiles);
            console.log("Selected files:", fileArray);
            setFiles(fileArray);
          }
        }}
        currentFile={files}
        placeholder="Choose an image"
        required
        id="image"
        htmlFor="image"
        multiple={true}
      />

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
          className="max-w-xs w-full absolute top-0 right-0 flex justify-center z-50"
        />
      )}
    </form>
  );
};

export default AddBlogForm;
