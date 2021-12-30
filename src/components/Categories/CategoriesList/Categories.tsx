import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';
import { CategoryInfo } from '../types';

const Categories = () => {
  const { categories } = useTypedSelector( store => store.categoryCrud)
  const { getSearchCategoryResult} = useActions();
  
  useEffect(() => {
    getSearchCategoryResult({});
  }, [getSearchCategoryResult]);

	return (
    <div className="container">
      <h1 className="text-center m-2">Категорії</h1>
      <table className="table align-middle table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Назва категоріх</th>
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

export default Categories;