import { Outlet } from "react-router";
import DefaultFooter from "./DefaultFooter";
import Header from "./Header";
import "./headers.css";

const DefaultLayout = () => {
  return (
    <div className="defaultPositions">
      <div>
        <Header />
        <div className="container pad p-4">
          <Outlet />
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
};
export default DefaultLayout;
