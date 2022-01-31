import { Outlet } from "react-router";
import DefaultFooter from "./DefaultFooter";
import Header from './Header';

const DefaultLayout = () => {
    return (
      <>
          <Header />
          <div className="container pad">
            <Outlet />
          </div>
          <DefaultFooter />
      </>
    );
}
export default DefaultLayout;