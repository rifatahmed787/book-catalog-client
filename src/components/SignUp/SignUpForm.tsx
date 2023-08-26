import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Button from "../ui/Button";
import ToastContainer from "../ui/Toast";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState } from "react";
import { get_error_messages } from "@/lib/error_messages";
import ICONS from "@/shared/AllIcons";
import { Link } from "react-router-dom";
import { useUploderMutation } from "@/redux/features/upload/uploadApi";

const SignUpForm = () => {
  // login mutation hook
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const [uploader] = useUploderMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState(" ");

  // file state
  const [file, setFile] = useState<File | undefined>();
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      console.log(selectedFile);

      // Set the file in the uploader mutation
      try {
        const response = await uploader({
          data: selectedFile,
        });

        // Handle the response as needed
        console.log(response);

        // Optionally, set the file state if needed
        setFile(selectedFile);

        // Set success message or handle success case
        setAlertType("success");
        setAlertMessages("File uploaded successfully");
        setIsAlertOpen(true);
      } catch (error) {
        // Handle errors here
        console.error(error);

        // Set error message or handle error case
        setAlertType("error");
        setAlertMessages("Error uploading file");
        setIsAlertOpen(true);
      }
    } else {
      setFile(undefined);
    }
  };

  // form state
  const [sign_up_form, setSignUpForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  //formSubmitHandler
  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { first_name, last_name, ...othersData } = sign_up_form;
    register({
      data: {
        ...othersData,
        name: {
          firstName: first_name,
          lastName: last_name,
        },
      },
    });
  };

  // Input handler
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setSignUpForm((prev) => ({ ...prev, [key]: e.target.value }));
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
      setAlertMessages("Signed up successfully");
    }
  }, [error, isError, isSuccess]);

  return (
    <div className="min-h-screen w-full    bg-box-pattern  flex items-center justify-center ">
      <form
        onSubmit={formSubmitHandler}
        className=" relative flex  max-w-lg rounded-xl w-full  flex-col gap-4 backdrop-blur-3xl bg-white/80 mx-5 px-5 md:px-[74px] py-7"
      >
        {/* title */}
        <div className="flex items-center justify-between gap-3 flex-wrap ">
          <h1 className=" text-4xl  font-anton text-ceter text-primary">
            Signup
          </h1>

          <Link to={"/"} className="flex items-center text-primary gap-2 ">
            {ICONS.home} Back to home
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              label="First Name"
              type="text"
              onChange={(e) => {
                inputChangeHandler(e, "first_name");
              }}
              currentValue={sign_up_form?.first_name}
              placeHolder=""
              id="firstName"
              htmlFor="firstName"
            />
            <TextInput
              type="text"
              placeHolder=""
              currentValue={sign_up_form?.last_name}
              onChange={(e) => {
                inputChangeHandler(e, "last_name");
              }}
              required={true}
              id="lastName"
              htmlFor="lastName"
              label="Last Name"
            />
          </div>

          {/* image url */}
          <TextInput
            type="file"
            placeHolder=""
            currentValue={sign_up_form?.imageUrl}
            onChange={onSelectFile}
            required={true}
            id="image"
            htmlFor="image"
            label=""
            className=""
          />

          {/* Email */}
          <TextInput
            type="email"
            placeHolder=""
            currentValue={sign_up_form?.email}
            onChange={(e) => {
              inputChangeHandler(e, "email");
            }}
            required={true}
            id="email"
            htmlFor="email"
            label="Email"
          />
          {/* Address */}
          <TextInput
            type="text"
            placeHolder=""
            currentValue={sign_up_form?.address}
            onChange={(e) => {
              inputChangeHandler(e, "address");
            }}
            required={true}
            id="address"
            htmlFor="address"
            label="Address"
          />
          {/* Password */}
          <TextInput
            type="password"
            placeHolder=""
            currentValue={sign_up_form?.password}
            onChange={(e) => {
              inputChangeHandler(e, "password");
            }}
            required={true}
            id="password"
            htmlFor="password"
            label="Password"
          />
        </div>

        <Button
          type="submit"
          title="Submit"
          className="mt-6 bg-primary w-full  text-base font-medium rounded"
          icon={isLoading ? ICONS.button_loading_icon : undefined}
          isDisabled={isLoading}
        />

        <div>
          <p className="font-inter text-base text-[#000] text-center ">
            Already have account?
            <Link to={"/auth/signin"}>
              <a className="ml-2  underline" href="">
                Login
              </a>
            </Link>
          </p>
        </div>

        {/* Toast */}
        {isAlertOpen && (
          <ToastContainer
            type={AlertType}
            messages={AlertMessages}
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            className="absolute  -bottom-14 left-0 right-0 mx-auto flex justify-center"
          />
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
