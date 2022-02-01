import { Outlet } from "react-router";
import DefaultFooter from "./DefaultFooter";
import Header from './Header';

const DefaultLayout = () => {
    return (
        <div className="defaultPositions">
            <Header/>
            <div className="container pad" >
                <Outlet />
            </div>
            <DefaultFooter/>
        </div>
    );
}
export default DefaultLayout;