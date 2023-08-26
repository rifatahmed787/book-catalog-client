import { Dropdown, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
	dropdown: {
		arrowIcon: "ml-2 h-4  ",
		content: "py-1  text-red-500 ",
		floating: {
			animation: "transition-opacity",
			arrow: {
				base: "absolute z-10 h-2 w-2 rotate-45",
				style: {
					dark: "bg-gray-900 dark:bg-gray-700",
					light: "bg-white",
					auto: "bg-white dark:bg-gray-700",
				},
				placement: "-4px",
			},
			base: "z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none ",
			content: "py-1 text-sm text-gray-700 dark:text-gray-200",
			divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
			header: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200   bg-red-200 w-[400px]",
			hidden: "invisible opacity-0",
			item: {
				container: "",
				base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
				icon: "mr-2 h-4 w-4",
			},
			style: {
				dark: "bg-gray-900 text-white dark:bg-gray-700",
				light: "border border-gray-200 bg-white text-gray-900",
				auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
			},
			target: " h-8 w-30 px-3 py-2 rounded-3xl text-lg bg-transparent text-[#000] hover:bg-[#000] text-[#000]  hover:text-white   border border-[#000] text-center ",
		},
		inlineWrapper: "",
	},
};

type IFilterDropDown = {
	header_label: string;
	items: string[];
	handleFilterValue: (value: string) => void;
};

export default function FilterDropDown({
	header_label,
	items,
	handleFilterValue,
}: IFilterDropDown) {
	return (
		<Flowbite theme={{ theme: customTheme }}>
			<Dropdown label={header_label}>
				{items?.map((item) => (
					<Dropdown.Item
						onClick={() =>
							handleFilterValue(item)
						}
					>
						{item}
					</Dropdown.Item>
				))}
			</Dropdown>
		</Flowbite>
	);
}

