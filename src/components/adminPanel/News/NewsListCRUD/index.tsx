import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import './table.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ImageBodyTemplate, Header } from "./configTable";
import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog} from "primereact/confirmdialog";
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import { useActions } from '../../../../hooks/useActions';
import { Toast } from "primereact/toast";
import { Helmet } from 'react-helmet';
import { IEditorValues } from '../types';
import { InputSwitch } from 'primereact/inputswitch';



const NewsAdminList = () => {
  const [visible, setVisible] = useState(false);
  const [delId, setDelId] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const { getNews, delNews, editNews } = useActions();
  const {news} = useTypedSelector( store => store.news);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const IsSHowBodyTemplate = (rowData: IEditorValues) => {
    return (
      <>
        <InputSwitch
          checked={rowData.isShow}
          onChange={() => {
            editNews({ ...rowData, isShow: !rowData.isShow });
          }}
        />
      </>
    );
  };

const ActionBodyTemplate = (rowData: IEditorValues) => {
  
   const deleteNews = async (id: number) => {
     await setVisible(true);
     setDelId(id);
   };

  return (
    <>
      <Helmet>
        <title>Список Новин</title>
      </Helmet>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Точно видалити?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={async () => {
          const res = await delNews(delId);
          if (toast.current !== null && res === "200") {
            toast.current.show({
              severity: "info",
              summary: "Виконано",
              detail: "Новину видалено",
              life: 3000,
            });
          }
          else {
            if (toast.current !== null && res !== "200") {
              toast.current.show({
                severity: "error",
                summary: "Не виконано",
                detail: "Щось пішло не так",
                life: 3000,
              });
            }
          }
        }}
      />
      <Link to={`/adminPanel/news/newsInfo/${rowData.slug}`}>
        <Button
          icon="pi pi-info"
          className="p-button-rounded p-button-info p-mr-2"
        />
      </Link>
      <Link to={`/adminPanel/news/edit/${rowData.slug}`}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
        />
      </Link>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning p-mr-2"
        onClick={() => rowData.id && deleteNews(rowData.id)}
      />
    </>
  );
};

    return (
      <div className="card">
        <Toast ref={toast} />

        <DataTable
          autoLayout={true}
          value={news}
          header={<Header />}
          responsiveLayout="stack"
          className="p-datatable"
        >
          <Column field="id" header="Id"></Column>
          <Column field="name" header="Назва"></Column>
          <Column header="Відображення" body={IsSHowBodyTemplate}></Column>
          <Column header="Фото" body={ImageBodyTemplate}></Column>
          <Column body={ActionBodyTemplate} header="Дії"></Column>
        </DataTable>
      </div>
    );
};

export default NewsAdminList;