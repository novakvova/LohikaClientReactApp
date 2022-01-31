import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import EclipseWidget from "../../../common/eclipse";
import CarSearch from "../../../CarsList/CarSearch/CarSearch";

import { ISearchCar } from "../../../CarsList/types";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ImageBodyTemplate } from "../Config/configTable";

const CarsListAdmin = () => {
  const [showLoader, setShowLoader] = useState(false);
  const { products } = useTypedSelector((store) => store.car);
  const { fetchCarsSearch } = useActions();
  const [visible, setVisible] = useState(false);
  const [delId, setDelId] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const { deleteCar } = useActions();

  const downloadCarList = useCallback(async () => {
    setShowLoader(true);
    await fetchCarsSearch({});
    setShowLoader(false);
  }, [fetchCarsSearch]);

  useEffect(() => {
    downloadCarList();
  }, [downloadCarList]);

  const ActionBodyTemplate = (rowData: ISearchCar) => {
    const delProduct = async (id: number) => {
      await setVisible(true);
      setDelId(id);
    };

    return (
      <>
        <Helmet>
          <title>Список продуктів</title>
        </Helmet>
        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message="Точно видалити?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => {
            deleteCar(delId);

            if (toast.current !== null) {
              toast.current.show({
                severity: "info",
                summary: "Виконано",
                detail: "Продукт видалено",
                life: 3000,
              });
            }
          }}
        />
        <Link to={`infoProduct/${rowData.id}`}>
          <Button
            icon="pi pi-info"
            className="p-button-rounded p-button-info p-mr-2"
          />
        </Link>
        <Link to={`EditProduct/${rowData.id}`}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning p-mr-2"
          onClick={() => delProduct(rowData.id)}
        />
      </>
    );
  };

  return (
    <div className="card">
      {showLoader && <EclipseWidget />}
      <Toast ref={toast} />
      <DataTable
        autoLayout={true}
        value={products}
        header={<CarSearch />}
        responsiveLayout="stack"
        className="p-datatable"
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Назва"></Column>
        <Column field="categoryName" header="Категорія"></Column>
        <Column header="Фото" body={ImageBodyTemplate}></Column>
        <Column field="price" header="Ціна"></Column>
        <Column body={ActionBodyTemplate} header="Дії"></Column>
      </DataTable>
    </div>
  );
};

export default CarsListAdmin;
