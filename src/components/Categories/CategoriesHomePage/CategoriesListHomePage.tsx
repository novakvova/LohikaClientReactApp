import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CategoryItemHomePage from '../CategoriesHomePage/CategoryItemHomePage';
import Pagination from '../Pagination/Pagination';
import { CategoryInfo } from '../types';
import './style.css'


const CategoriesListHomePage = () => {
  const { categories } = useTypedSelector((store) => store.categoryCrud);
  const { getSearchCategoryResult } = useActions();

  useEffect(() => {
    getSearchCategoryResult({});
  }, [getSearchCategoryResult]);

  return (
    <>
      <h2 className='d-flex justify-content-center mt-5'>Категорії товарів</h2>
      <div className="d-flex justify-content-around mb-5 mt-5 responsiveContainer">
        {categories.map((categoryItem: CategoryInfo, idx) => (
          <CategoryItemHomePage key={idx} categoryItem={categoryItem} />
        ))}
      </div>
    </>
  );
};

export default CategoriesListHomePage;
