import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <div
        className="min-h-[90vh] "
        style={{
          background: "linear-gradient(#0b004e, #1d152f, #002834)",
        }}
      >
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
