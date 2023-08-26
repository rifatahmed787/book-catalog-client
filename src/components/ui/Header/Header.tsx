// import { ICONS } from "@/shared/AllIcons";
import logo from "@/assets/images/BookCatalog.png";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

export default function Header() {
	// auth selector
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [_cookies, _setCookie, removeCookie] = useCookies([
		"auth_details",
	]);

	// handle logout
	const handleLogout = () => {
		removeCookie("auth_details", { path: "/" });
		dispatch(userLoggedOut());
	};

	return (
		<div className=" max-w-[1170px] mx-auto  bg-transparent flex items-center md:items-center justify-between py-4 border-b border-[#000000] ">
			{/* logo */}
			<Link to={"/"}>
				<img
					src={logo}
					alt=""
					className="  flex-none"
				/>
			</Link>

			{/* Menus */}
			<ul className="flex items-center flex-wrap justify-end divide-x divide-[#3B3B3B] ">
				<Link to="/books">
					<li
						className=" text-sm sm:text-base font-normal text-[#3B3B3B]
				 font-inter px-2 md:px-8 "
					>
						Books
					</li>
				</Link>

				{isLoggedIn && (
					<Link to="/wishlist">
						<li
							className=" text-sm sm:text-base font-normal text-[#3B3B3B]
				 font-inter px-2 md:px-8 "
						>
							Wishlist
						</li>
					</Link>
				)}
				{isLoggedIn && (
					<Link to="/reading-list">
						<li
							className=" text-sm sm:text-base font-normal text-[#3B3B3B]
				 font-inter px-2 md:px-8 "
						>
							Reading list
						</li>
					</Link>
				)}
				{isLoggedIn ? (
					<li
						onClick={handleLogout}
						className=" cursor-pointer text-sm sm:text-base font-normal text-[#3B3B3B]
				 font-inter px-2 md:px-8 "
					>
						Log out
					</li>
				) : (
					<Link to={"/auth/signin"}>
						<li
							className=" text-sm sm:text-base font-normal text-[#3B3B3B]
				 font-inter  px-2 md:px-8"
						>
							Log IN
						</li>
					</Link>
				)}
			</ul>
		</div>
	);
}

