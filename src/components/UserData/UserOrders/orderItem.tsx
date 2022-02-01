import { UniqueComponentId } from 'primereact/utils';
import { Order } from './types';

interface OrderProps {
  data: Order;
}

const OrderItem = (props: OrderProps) => {
	const { data:{id, dateCreated, statusName, items, region, city, street, homeNumber, consumerFirstName, consumerSecondName, consumerPhone,}} = props;
	const quan = items.reduce((prev, current) => prev + current.quantity, 0);
	const totalSum = items.reduce((prev, current) => prev + current.buyPrice * current.quantity, 0)
  return (
    <>
      <div className="row m-3">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="accordion-item">
            <h2 className="accordion-header" id={`${id}`}>
              <div className="row">
                <button
                  className="accordion-button collapsed col"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${id}`}
                >
                  <div className="col">№: {id}</div>
                  <div className="col">Дата замовлення: {dateCreated}</div>
                  <div className="col">Статус: {statusName}</div>
                </button>
              </div>
            </h2>
            <div
              id={`collapse${id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`${id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {items.map(({ productName, quantity, buyPrice, productImage }) => {
                  return (
                    <div className="card m-2" key={UniqueComponentId()}>
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
                <div className="d-flex">
                  <b> Загальна сума: {totalSum} $</b>
                </div>
                <div className="d-flex">
                  <b> Кількість: {quan}</b>
                </div>
                <div className="d-flex">
                  <b> Дані отримувач: &nbsp; </b>
                  <span>
                    {consumerFirstName} {consumerSecondName} тел.&nbsp;
                    {consumerPhone}
                  </span>
                </div>
                <div className="d-flex">
                  <b> Адреса доставки: &nbsp; </b>
                  <span>
                    &nbsp; обл.
                    {region.charAt(0).toUpperCase() + region.slice(1)},
                  </span>
                  <span>
                    м. {city.charAt(0).toUpperCase() + city.slice(1)},
                    вул.&nbsp;
                  </span>
                  <span>
                    {street.charAt(0).toUpperCase() + street.slice(1)},
                  </span>
                  <span>буд. {homeNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default OrderItem;