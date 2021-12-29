import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ImageBodyTemplate, Header } from "../Config/configTable";
import Paginator from '../Paginator';
import { useRef, useState } from 'react';
import { UserInfo } from '../types';
import { ConfirmDialog} from "primereact/confirmdialog";
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { useActions } from '../../../../hooks/useActions';
import { Toast } from "primereact/toast";



const UserList = () => {
  const [visible, setVisible] = useState(false);
  const [delId, setDelId] = useState<number>(0);
    const toast = useRef<Toast>(null);
  const { deleteUser } = useActions();

const ActionBodyTemplate = (rowData: UserInfo) => {
  const delUser = async (id:number) => {
      await setVisible(true);
      setDelId(id);
  } 

  return (
    <>

      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => {
          deleteUser(delId);

          if (toast.current !== null) {
            toast.current.show({
              severity: "info",
              summary: "Виконано",
              detail: "Користувача видалено",
              life: 3000,
            });
          }
        }}
      />

      <Link to={`userinfo/${rowData.id}`}>
        <Button
          icon="pi pi-info"
          className="p-button-rounded p-button-info p-mr-2"
        />
      </Link>
      <Link to={`edit/${rowData.id}`}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
        />
      </Link>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning p-mr-2"
        onClick={() => delUser(rowData.id)}
      />
    </>
  );
};





	const { users } = useTypedSelector(store => store.userCrud);
    return (
      <div className="card">
        <Toast ref={toast} />

        <DataTable
          autoLayout={true}
          value={users}
          header={<Header />}
          footer={<Paginator />}
          responsiveLayout="stack"
          className="p-datatable"
        >
          <Column field="id" header="Id"></Column>
          <Column field="firstName" header="Імя"></Column>
          <Column field="secondName" header="Прізвище"></Column>
          <Column header="Фото" body={ImageBodyTemplate}></Column>
          <Column field="phone" header="Телефон"></Column>
          <Column field="email" header="Email"></Column>
          <Column body={ActionBodyTemplate} header="Дії"></Column>
        </DataTable>
      </div>
    );
};

export default UserList;