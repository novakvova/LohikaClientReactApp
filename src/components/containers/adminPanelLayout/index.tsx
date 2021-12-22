import { Outlet } from 'react-router-dom';
import SideBar from '../../adminPanel/sideBar/sideBar';

const AdminPanelLayout = () => {
	return (
    <>
      <div className="p-grid mb-2">
        <SideBar orientation="horizontal" />
      </div>
      <div className="p-grid">
        <div className="p-col-2">
          <SideBar orientation="vertical" />
        </div>
        <div className="p-col-8">
			<Outlet />
		</div>
      </div>
    </>
  );
};

export default AdminPanelLayout;