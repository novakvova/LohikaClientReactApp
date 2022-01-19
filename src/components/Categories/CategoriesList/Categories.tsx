import {  useRef, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { CategoryInfo } from '../types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { AdminSearch, TableImageTemplate } from '../AdminTableConfigs/Configs';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

const CategoriesList = () => {
  const { categories } = useTypedSelector((store) => store.categoryCrud);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const { deleteCategory } = useActions();
// console.log(categories);




  const ActionBodyTemplate = (rowData: CategoryInfo) => {
    const delCategory = async (id: number) => {
      await setVisible(true);
      setDeleteId(id);
    };

    return (
      <>
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Ви впевнені, що хочете видалити категорію?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => {
            deleteCategory(deleteId);

            if (toast.current !== null) {
              toast.current.show({
                severity: 'info',
                summary: 'Виконано',
                detail: 'Категорію видалено',
                life: 3000,
              });
            }

            console.log(toast.current);
          }}
        />

        <Link to={`categoryInfo/${rowData.id}`}>
          <Button icon="pi pi-info" className="p-button-rounded p-button-info p-mr-3" />
        </Link>
        <Link to={`edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-3" />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-mr-3"
          onClick={() => delCategory(rowData.id)}
        />
      </>
    );
  };

  return (
    <div className="container team_dark">
      <div className="card">
        <DataTable
          value={categories}
          header={<AdminSearch />}
          footer={<Pagination />}
          autoLayout={true}
          responsiveLayout="stack"
          className="p-datatable">
          <Column field="id" header="Id"></Column>
          <Column field="title" header="Назва категорії"></Column>
          <Column body={TableImageTemplate} header={'Зображення'}></Column>
          <Column field="priority" header="Пріорітет"></Column>
          <Column field="urlSlug" header="UrlSlug"></Column>
          <Column body={ActionBodyTemplate} header="Дії"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default CategoriesList;
