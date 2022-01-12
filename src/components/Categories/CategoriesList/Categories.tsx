import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';
import { CategoryInfo } from '../types';
import '../category.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CategorySearch from '../CategorySearch/CategorySearch';
import { Button } from "primereact/button";

const CategoriesList = () => {
  const { categories } = useTypedSelector((store) => store.categoryCrud);

  const { getSearchCategoryResult } = useActions();

  useEffect(() => {
    getSearchCategoryResult({});
  }, [getSearchCategoryResult]);

  return (
    <div className="container team_dark">
      <div className="card">
        <DataTable 
        value={categories} 
        // header={<CategorySearch/>}
        autoLayout={true}
        responsiveLayout="stack" 
        className="p-datatable">
          <Column field="id" header="Id"></Column>
          <Column field="title" header="Назва категорії"></Column>
          <Column field="image" header="Зображення"></Column>
          <Column field="priority" header="Пріорітет"></Column>
          <Column field="urlSlug" header="UrlSlug"></Column>
          {/* <Column body={ActionBodyTemplate} header="Дії"></Column> */}
        </DataTable>
      </div>
      {/* <table className="table align-middle team_dark">
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
      </table> */}
    </div>
  );
};

export default CategoriesList;
