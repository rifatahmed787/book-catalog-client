import Footer from "@/components/ui/Footer";

import Navbar from "@/components/ui/Navbar/Navbar";
import TopNav from "@/components/ui/Navbar/TopNav";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col  ">
      {/* Header */}

      <div>
        <TopNav />
        <Navbar />
      </div>
      {/* children */}
      <div className="flex-grow">{<Outlet />}</div>

      {/* footer */}
      <div className="mt-auto ">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
