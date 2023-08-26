import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Button from "../ui/Button";
import ToastContainer from "../ui/Toast";
import TextInput from "../ui/form_items/TextInput";
import { useEffect, useState } from "react";
import { get_error_messages } from "@/lib/error_messages";
import ICONS from "@/shared/AllIcons";
import { Link } from "react-router-dom";

const SignUpForm = () => {
	// login mutation hook
	const [register, { isLoading, isError, error, isSuccess }] =
		useRegisterMutation();

	// Alert State
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [AlertType, setAlertType] = useState<
		"success" | "error" | "warning"
	>("success");
	const [AlertMessages, setAlertMessages] = useState(" ");

	// form state
	const [sign_up_form, setSignUpForm] = useState({
		first_name: "",
		last_name: "",
		address: "",
		email: "",
		password: "",
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
				className=" relative flex  max-w-lg rounded-xl w-full  flex-col gap-4 bg-[#FFFFFF] px-[74px] py-12 "
			>
				{/* title */}
				<div className="flex items-center justify-between gap-3 flex-wrap ">
					<h1 className=" text-4xl  font-anton text-ceter ">
						Signup
					</h1>

					<Link
						to={"/"}
						className="flex items-center  gap-2 "
					>
						{ICONS.home} Back to home
					</Link>
				</div>
				<div className="flex flex-col gap-6">
					{/* Name */}
					<div className="grid grid-cols-2 gap-3">
						<TextInput
							type="text"
							placeHolder="First Name"
							currentValue={
								sign_up_form?.first_name
							}
							onChange={(e) => {
								inputChangeHandler(
									e,
									"first_name"
								);
							}}
							required={true}
						/>
						<TextInput
							type="text"
							placeHolder="Last Name"
							currentValue={
								sign_up_form?.last_name
							}
							onChange={(e) => {
								inputChangeHandler(
									e,
									"last_name"
								);
							}}
							required={true}
						/>
					</div>
					{/* Email */}
					<TextInput
						type="email"
						placeHolder="test@gmail.com"
						currentValue={sign_up_form?.email}
						onChange={(e) => {
							inputChangeHandler(e, "email");
						}}
						required={true}
					/>
					{/* Address */}
					<TextInput
						type="text"
						placeHolder="Address"
						currentValue={sign_up_form?.address}
						onChange={(e) => {
							inputChangeHandler(
								e,
								"address"
							);
						}}
						required={true}
					/>
					{/* Password */}
					<TextInput
						type="password"
						placeHolder="Enter your password"
						currentValue={sign_up_form?.password}
						onChange={(e) => {
							inputChangeHandler(
								e,
								"password"
							);
						}}
						required={true}
					/>
				</div>

				<Button
					type="submit"
					title="Submit"
					className="mt-6 bg-[#B4E907] w-full py-[17px] md:py-[17px] border border-[#000]  text-base font-medium rounded"
					icon={
						isLoading
							? ICONS.button_loading_icon
							: undefined
					}
					isDisabled={isLoading}
				/>

				<div>
					<p className="font-inter text-base text-[#000] text-center ">
						Already have account?
						<Link to={"/auth/signin"}>
							<a
								className="ml-2  underline"
								href=""
							>
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

