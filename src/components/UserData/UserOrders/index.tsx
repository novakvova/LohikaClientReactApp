import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import OrderItem from './orderItem';

const OredrList = () => {
	const { GetOrdersList } = useActions();
	const { orders } = useTypedSelector(store => store.profile)
	useEffect(() => {
		GetOrdersList();
	}, [GetOrdersList]);
	return (
    <>
      <Helmet>
        <title>Мої замовлення</title>
      </Helmet>
      <h2 className="text-center p-3">Мої замовлення</h2>
	  <div className="accordion" id="accordionExample">
     {
	 	orders.length > 0 && orders.map((el) => <OrderItem key={el.id} data={el}/>)
	 }
	 </div>
    </>
  );
};

export default OredrList;