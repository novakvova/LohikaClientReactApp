import { Outlet } from 'react-router-dom';
import SideBar from '../../adminPanel/sideBar/sideBar';

const AdminPanelLayout = () => {
	
	return (
    <>
      <div className="container">
        <div className="p-grid">
          <div className="p-col-3"></div>
          <div className="col-9">
            <h1 className="text-center">Адміністрування</h1>
          </div>
        </div>
        <div className="p-grid">
          <div className="p-col-3">
            <SideBar />
          </div>
          <div className="p-col-9">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;