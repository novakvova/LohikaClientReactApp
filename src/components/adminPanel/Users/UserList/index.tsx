import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ActionBodyTemplate, ImageBodyTemplate, Header } from "../Config/configTable";
import Paginator from '../Paginator';


const UserList = () => {
	const { users } = useTypedSelector(store => store.userCrud);

const footer = <Paginator />;

    return (
      <div className="card">
        <DataTable
          autoLayout={true}
          value={users}
          header={<Header />}
          footer={footer}
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
}

export default UserList;