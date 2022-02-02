import { Accordion, AccordionTab } from "primereact/accordion";
import { UniqueComponentId } from 'primereact/utils';
import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Dropdown } from "primereact/dropdown";
import "./list.css"
import { Helmet } from 'react-helmet';
import { OrderStatus } from './types';
import { Card } from 'primereact/card';


const Orders = () => {
	const { orders, status } = useTypedSelector( store => store.ordersReducer);
	const { GetAdminOrdersList, ChangeOrderStatus } = useActions();

	useEffect(() => {
		GetAdminOrdersList();
	}, [GetAdminOrdersList]);


	const content = orders.map(({id, dateCreated, statusName, items}) => {
			const statusObj = status.filter((el) => el.name === statusName);
			const header = (
        <div className="d-flex align-items-center" style={{ minWidth: "100%" }}>
          <div className="col-1">№: {id}</div>
          <div className="col-3">Дата замовлення: {dateCreated}</div>
          <div className="col-3 p-2">
            Статус: &nbsp;
            <Dropdown
              className=""
              value={statusObj[0]}
              options={status}
              onChange={(e) => {
                e.stopPropagation();
                const statusData = e.target.value as OrderStatus;
                ChangeOrderStatus(id, statusData.id, statusData.name);
              }}
              optionLabel="name"
            />
          </div>
        </div>
      );
			return (
        <AccordionTab key ={id} header={header}>
          {items.map(({ productName, quantity, buyPrice, productImage }) => {
            return (
              
                <div className="card bg-secondary m-2" key={UniqueComponentId()}>
                  <div className="card-body row">
                    <div className="media">
                      <div className="row my-auto flex-column flex-md-row">
                        <div className="col align-self-center">
                          <img
                            className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0"
                            src={`https://vovalohika.tk/images/100_${productImage[0]}`}
                            width="100"
                            height="56"
                            alt={`https://vovalohika.tk/images/100_${productImage[0]}`}
                          />
                        </div>
                        <div className="col my-auto">
                          <small>Товар: {productName}</small>
                        </div>
                        <div className="col my-auto">
                          <small>Ціна : {buyPrice} $</small>
                        </div>
                        <div className="col my-auto">
                          <small>Кількість : {quantity}</small>
                        </div>
                        <div className="col my-auto">
                          <h6 className="mb-0">
                            Cума : {buyPrice * quantity} $
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            );
          })}
        </AccordionTab>
      );
		})

	
	
	return (
    <>
      <Helmet>
        <title>Замовлення</title>
      </Helmet>
      <div>
        <Card>
          <h2 className="text-center p-3" >
            Замовлення
          </h2>
          <Accordion className="d-flex flex-column" activeIndex={null}>
            {content}
          </Accordion>
        </Card>
      </div>
    </>
  );
};

export default Orders;