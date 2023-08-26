import { cn } from "@/lib/utils";

type IButton = {
	title: string;
	className: string;
	type?: "button" | "submit" | "reset";
	isDisabled?: boolean;
	onClickHandler?: () => void;
	icon?: React.ReactNode | undefined;
};

const Button = ({
	title,
	className,
	type,
	isDisabled,
	onClickHandler,
	icon,
}: IButton) => {
	const default_styles =
		"   px-[30px]  md:px-[60px] py-[15px] md:py-[30px]  flex items-center justify-center gap-3 text-[#FFF] text-center font-inter  text-base  md:text-lg font-bold  ";
	return (
		<button
			type={type ?? "button"}
			className={cn(default_styles, className)}
			disabled={isDisabled ?? false}
			onClick={() => onClickHandler && onClickHandler()}
		>
			{title}
			{icon && icon}
		</button>
	);
};

export default Button;

