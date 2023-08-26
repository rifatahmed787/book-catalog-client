import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useCookies } from "react-cookie";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

const Profile = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	/* eslint-disable @typescript-eslint/no-unused-vars */
	const [_cookies, _setCookie, removeCookie] = useCookies([
		"auth_details",
	]);

	// handle logout
	const handleLogout = () => {
		dispatch(userLoggedOut());
		// dispatch(apiSlice.util.invalidateTags(["courseVideos"]));
		removeCookie("auth_details", { path: "/" });
	};

	return (
		<div>
			<button
				onClick={handleLogout}
				className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
			>
				Log out
			</button>

			<div
				id="dropdownAvatar"
				className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600   "
			>
				<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
					<div>{user?.name?.firstName}</div>
					<div className="font-medium truncate">
						{user?.email}
					</div>
				</div>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownUserAvatarButton"
				>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Dashboard
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Settings
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						>
							Earnings
						</a>
					</li>
				</ul>
				<div className="py-2"></div>
			</div>
		</div>
	);
};

export default Profile;

