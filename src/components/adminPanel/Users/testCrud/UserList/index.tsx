import { useEffect, useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './table.css';
import { useActions } from '../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { ActionBodyTemplate, ImageBodyTemplate, Header } from "../Config/configTable";
import Paginator from '../../Paginator';
import Search from '../SearchForm';


const UserListTEst = () => {
	const { getSearchResult} = useActions();
	const { users, total } = useTypedSelector(store => store.userCrud);
  

    useEffect(() => {
      getSearchResult({});
    }, [getSearchResult]); 

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

export default UserListTEst;