import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = useAuth();
	return isLoggedIn ? <Navigate to="/" /> : children;
};

export default AuthRoute;
