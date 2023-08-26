import Footer from "@/components/ui/Footer";

import Navbar from "@/components/ui/Navbar/Navbar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#EBE9E1] min-h-screen w-full flex flex-col  ">
      {/* Header */}
      <div>
        <Navbar />
      </div>
      {/* children */}
      <div className="flex-grow">{<Outlet />}</div>

      {/* footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
