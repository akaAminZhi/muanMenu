import { Outlet } from "react-router-dom";
import Loader from "./Loader";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {isLoading && <Loader />} */}

      <Header />

      <div className=" bg-yellow-100">
        <main className=" mx-auto max-w-5xl overflow-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
