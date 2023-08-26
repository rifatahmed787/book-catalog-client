import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-box-pattern  flex items-center justify-center ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
