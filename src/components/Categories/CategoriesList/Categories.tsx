import { useEffect, useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
// import CategoryItem from './CategoryItem';
import { CategoryInfo } from '../types';
// import '../category.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CategorySearch from '../CategorySearch/CategorySearch';
import { Button } from "primereact/button";
import { AdminSearch, TableImageTemplate } from '../AdminTableConfigs/Configs'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const CategoriesList = () => {
  const { categories } = useTypedSelector((store) => store.categoryCrud);

  const { getSearchCategoryResult } = useActions();

  useEffect(() => {
    getSearchCategoryResult({});
  }, [getSearchCategoryResult]);

  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);


   

  return (
    <div className="container team_dark">
      <div className="card">
      <Toast ref={toast} />

        <DataTable 
        value={categories} 
        header={<AdminSearch/>}
        autoLayout={true}
        responsiveLayout="stack" 
        className="p-datatable">
          <Column field="id" header="Id"></Column>
          <Column field="title" header="Назва категорії"></Column>
          <Column body={TableImageTemplate} header="Зображення"></Column>
          <Column field="priority" header="Пріорітет"></Column>
          <Column field="urlSlug" header="UrlSlug"></Column>
          <Column body={""} header="Дії"></Column>
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
