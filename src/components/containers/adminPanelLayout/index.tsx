import { Outlet } from 'react-router-dom';
import SideBar from '../../adminPanel/sideBar/sideBar';

const AdminPanelLayout = () => {
	

	return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#20262e", minHeight: "100vh"}}
      >
        <div className="row">
          <div className="col-2"></div>
          <div className="col-10">
            <h1 className="text-center">Адміністрування</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;