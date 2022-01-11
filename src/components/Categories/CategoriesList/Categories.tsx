import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';
import { CategoryInfo } from '../types';
import "../category.css";

const CategoriesList = () => {
  const { categories } = useTypedSelector( store => store.categoryCrud)

  const { getSearchCategoryResult} = useActions();
  
  useEffect(() => {
    getSearchCategoryResult({});
  }, [getSearchCategoryResult]);


	return (
    <div className="container team_dark">
      <h1 className="text-center m-2">Категорії</h1>
      <table className="table align-middle team_dark">
        <thead>
          <tr className="team_dark">
            <th scope="col">Id</th>
            <th scope="col">Назва категорії</th>
            <th scope="col">Зображення</th>
            <th scope="col">Пріорітет</th>
            <th scope="col">UrlSlug</th>
            <th scope="col">Змінити</th>
            <th scope="col">Видалити</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((categoryItem: CategoryInfo, idx) => (
              <CategoryItem key={idx} categoryItem={categoryItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesList;