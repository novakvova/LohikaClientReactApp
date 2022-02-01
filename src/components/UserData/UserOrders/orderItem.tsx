import { Order } from './types';

interface OrderProps {
  data: Order;
}

const OrderItem = (props: OrderProps) => {
	const { data:{id, dateCreated, statusName}} = props;
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
              <div className="accordion-body">BODY</div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default OrderItem;