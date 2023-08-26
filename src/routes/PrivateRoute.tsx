import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const isLoggedIn = useAuth();
	return isLoggedIn ? children : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
