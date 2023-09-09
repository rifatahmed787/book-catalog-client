import { RouterProvider } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import { AllRoutes } from "./routes/MainRoutes";
import "flowbite";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader/Preloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const authChecked = useAuthCheck();
  return !authChecked && isLoading ? (
    <Preloader />
  ) : (
    <RouterProvider router={AllRoutes} />
  );
};

export default App;
