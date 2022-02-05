import { Outlet } from 'react-router';
import BreadCrumb from '../../common/Breadcrumbs/BreadCrumb';
import DefaultFooter from './DefaultFooter';
import Header from './Header';
import './headers.css';

const DefaultLayout = () => {
  return (
    <div className="defaultPositions">
      <div>
        <Header />
        <div className="container pad pb-4">
          <BreadCrumb />
          <Outlet />
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
};
export default DefaultLayout;
