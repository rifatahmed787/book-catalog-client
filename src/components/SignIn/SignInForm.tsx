import { Link } from "react-router-dom";
import Button from "../ui/Button";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState } from "react";
import ToastContainer from "../ui/Toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import ICONS from "@/shared/AllIcons";
import { get_error_messages } from "@/lib/error_messages";

const SignInForm = () => {
	// login mutation hook
	const [login, { isLoading, isError, error, isSuccess }] =
		useLoginMutation();

	// Alert State
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [AlertType, setAlertType] = useState<
		"success" | "error" | "warning"
	>("success");
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
		<form
			onSubmit={formSubmitHandler}
			className=" relative flex  max-w-lg rounded-xl w-full  flex-col gap-4 bg-[#FFFFFF] px-10 md:px-[74px] py-12 "
		>
			<div className="flex items-center justify-between gap-3 flex-wrap ">
				<h1 className=" text-4xl  font-anton text-ceter ">
					LOG IN
				</h1>

				<Link
					to={"/"}
					className="flex items-center  gap-2 "
				>
					{ICONS.home} Back to home
				</Link>
			</div>

			<div className="flex flex-col gap-6">
				<TextInput
					type="email"
					placeHolder="test@gmail.com"
					currentValue={sign_in_form.email}
					onChange={(e) => {
						inputChangeHandler(e, "email");
					}}
					required={true}
				/>
				<TextInput
					type="password"
					placeHolder="Enter your password"
					currentValue={sign_in_form.password}
					onChange={(e) => {
						inputChangeHandler(e, "password");
					}}
					required={true}
				/>
			</div>

			{/* Submit button */}
			<Button
				type="submit"
				title="Submit"
				className="mt-6 bg-[#B4E907] w-full py-[17px] md:py-[17px] border border-[#000] 
					 text-base font-medium rounded"
				icon={
					isLoading
						? ICONS.button_loading_icon
						: undefined
				}
				isDisabled={isLoading}
			/>

			{/* Signin Footer note */}
			<div>
				<p className="font-inter text-base text-[#000] text-center ">
					Not registered?
					<Link to={"/auth/signup"}>
						<a
							className="ml-2  underline"
							href=""
						>
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
					className="absolute  -bottom-14 left-0 right-0 mx-auto flex justify-center"
				/>
			)}
		</form>
	);
};

export default SignInForm;

