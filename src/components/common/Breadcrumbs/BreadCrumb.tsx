import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import "./Breadcrumbs.module.css"

const BreadCrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    console.log(pathname);
    
    const pathNames = pathname.split('/').filter((item) => item);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div >
        <Breadcrumb>
          {pathNames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">
                {' '}
                <HomeOutlined /> Home
              </Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <HomeOutlined /> Home
            </Breadcrumb.Item>
          )}
          {pathNames.map((name, index) => {
            const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;
            return isLast ? (
              <Breadcrumb.Item key={name}>{capitalize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={name}>
                <Link to={`${routeTo}`}>{capitalize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <div className="bcContainer">{breadCrumbView()}</div>;
};

export default BreadCrumb;
