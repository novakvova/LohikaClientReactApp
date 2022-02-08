import { useLocation, Link, useParams,  } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import "./Breadcrumbs.module.css"
import { useActions } from '../../../hooks/useActions';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const BreadCrumb = () => {
  const location = useLocation();
  // console.log(location);
// const {categoryName} = useParams();
// console.log(categoryName);
// const { getProductsByCategorySlug } = useActions();

// useEffect(() => {
//   return getProductsByCategorySlug(String(categoryName));
// }, [getProductsByCategorySlug, categoryName]);

// const cps = useTypedSelector((store) => store.productsReducer);

// console.log(cps.ppl.categoryName);
  

  const breadCrumbView = () => {
    const { pathname } = location;
    
    const pathNames = pathname.split('/').filter((item) => item);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div >
        <Breadcrumb>
          {pathNames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/"> Головна сторінка</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item> Головна сторінка</Breadcrumb.Item>
          )}
          {pathNames.map((name, index) => {            
            const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
            console.log(routeTo);

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


