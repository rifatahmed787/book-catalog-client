import { Link } from "react-router-dom";
import Button from "../ui/Button";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState, useContext } from "react";
import ToastContainer from "../ui/Toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";

const SignInForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  // login mutation hook
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  // Alert State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [AlertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [AlertMessages, setAlertMessages] = useState("");

  // form state
  const [sign_in_form, setSignInform] = useState({
    email: "",
    password: "",
  });

  //formSubmitHandler
  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login({ data: sign_in_form });
  };

  // Input handler
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setSignInform((prev) => ({ ...prev, [key]: e.target.value }));
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
      setAlertMessages("Logged in successfully");
    }
  }, [error, isError, isSuccess]);

  return (
    <div
      className={`min-h-screen w-full  flex items-center justify-center ${
        darkMode ? "bg-black" : "bg-box-pattern "
      }`}
    >
      <form
        onSubmit={formSubmitHandler}
        className={`relative flex  max-w-lg rounded-xl w-full  flex-col gap-4 backdrop-blur-3xl bg-white/80 px-10 md:px-[74px] py-12 ${
          darkMode ? "bg-gradient-backdrop" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-3 flex-wrap ">
          <h1 className=" text-4xl  font-anton text-ceter text-primary">
            LOG IN
          </h1>

          <Link to={"/"} className="flex items-center  gap-2 text-primary">
            {ICONS.home} Back to home
          </Link>
        </div>

        <div className="flex flex-col gap-6 mt-5">
          <TextInput
            type="email"
            placeHolder=""
            currentValue={sign_in_form.email}
            onChange={(e) => {
              inputChangeHandler(e, "email");
            }}
            required={true}
            id="email"
            htmlFor="email"
            label="Email"
          />
          <TextInput
            type="password"
            placeHolder=""
            currentValue={sign_in_form.password}
            onChange={(e) => {
              inputChangeHandler(e, "password");
            }}
            required={true}
            id="password"
            htmlFor="password"
            label="Password"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          title="Submit"
          className="mt-6 bg-primary w-full 
					 text-base font-medium rounded"
          icon={isLoading ? ICONS.button_loading_icon : undefined}
          isDisabled={isLoading}
        />

        {/* Signin Footer note */}
        <div>
          <p
            className={`font-inter text-base text-[#000] text-center ${
              darkMode ? "text-gray-300" : ""
            }`}
          >
            Not registered?
            <Link to={"/auth/signup"}>
              <a className="ml-2  underline" href="">
                Create an Account
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
            className="absolute  top-20 z-50 left-0 right-0 mx-auto flex justify-center"
          />
        )}
      </form>
    </div>
  );
};

export default SignInForm;
