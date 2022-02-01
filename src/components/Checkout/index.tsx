import { Form, FormikProvider, useFormik } from 'formik';
import { Button } from 'primereact/button';
import { useEffect, useRef } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import InputGroup from '../common/InputGroup';
import { IOrder, IOrderItem } from './types';
import { orderSchema } from './validation';
import http from "../../http_common";
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import EclipseWidget from '../common/eclipse';


const CheckOut = () => {
	const { cartData } = useTypedSelector(store => store.cart)
	const { GetProfileData, clearCartData } = useActions();
  const [loading, setLoading] = useState<boolean>(false);
  const { profile : { phone,  firstName, secondName} } = useTypedSelector( store => store.profile);
	const quan = cartData.reduce((prev, current) => prev + current.quantity, 0);
	const totalSum = cartData.reduce((prev, current) => prev + current.productPrice * current.quantity, 0)
    const toast = useRef<Toast>(null);
	const navigate = useNavigate();

	useEffect(() => {
	GetProfileData();
	}, [GetProfileData]);

	const initialValues: IOrder = {
    consumerFirstName: firstName,
    consumerSecondName: secondName,
    consumerPhone: phone,
    region: "",
    city: "",
    street: "",
    homeNumber: "",
    statusId: 1,
    orderItems: cartData.map((el): IOrderItem => {
      return {
        productId: el.productId,
        buyPrice: el.productPrice,
        quantity: el.quantity,
      };
    }),
  };

	const onHandleSubmit = async () => {
		try {
      setLoading(true);
			const result = await http.post<number>("/api/Orders/add", values);
			const { status } = result;
			
			if (toast.current !== null && status === 200) {
				await toast.current.show({
				severity: "info",
				summary: "Виконано",
				detail: "Замовлення оформлено",
				life: 3000,
				});
				setTimeout(() => navigate("/"), 1000);
          	}
            clearCartData();
            setLoading(false)
		} catch (error) {
					if (toast.current !== null ) {
						toast.current.show({
				severity: "error",
				summary: "Не виконано",
				detail: "Щось пішло не так",
				life: 3000,
				});
			}
		}
	}

		const formik = useFormik({
		initialValues: initialValues,
		validationSchema: orderSchema,
		onSubmit: onHandleSubmit,
		enableReinitialize: true
		});
		const { errors, touched, handleChange, handleSubmit, values } = formik;
	return (
    <>
      <Helmet>
        <title>Оформлення замовлення</title>
      </Helmet>
      {loading && <EclipseWidget />}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Toast ref={toast} />
          <div className="row m-4">
            <h3 className="text-center">Оформлення замовлення</h3>
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <h5 className="m-3 text-center">Контактні дані</h5>
                  <InputGroup
                    field="consumerFirstName"
                    label="Ім'я"
                    type="text"
                    value={values.consumerFirstName}
                    error={errors.consumerFirstName}
                    touched={touched.consumerFirstName}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <InputGroup
                    field="consumerSecondName"
                    label="Прізвище"
                    type="text"
                    value={values.consumerSecondName}
                    error={errors.consumerSecondName}
                    touched={touched.consumerSecondName}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <InputGroup
                    field="consumerPhone"
                    label="Телефон"
                    type="text"
                    pattern={`+3 ([0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2} )`}
                    value={values.consumerPhone}
                    error={errors.consumerPhone}
                    touched={touched.consumerPhone}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                <div className="col-6">
                  <h5 className="m-3 text-center">Доставка</h5>
                  <InputGroup
                    field="region"
                    label="Область"
                    type="text"
                    value={values.region}
                    error={errors.region}
                    touched={touched.region}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <InputGroup
                    field="city"
                    label="Місто"
                    type="text"
                    value={values.city}
                    error={errors.city}
                    touched={touched.city}
                    onChange={handleChange}
                  />
                  <InputGroup
                    field="street"
                    label="Вулиця"
                    type="text"
                    value={values.street}
                    error={errors.street}
                    touched={touched.street}
                    onChange={handleChange}
                  />
                  <InputGroup
                    field="homeNumber"
                    label="Номер будинку, квартира"
                    type="text"
                    value={values.homeNumber}
                    error={errors.homeNumber}
                    touched={touched.homeNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <h5 className="m-2 text-center">Товари</h5>
              {cartData.map(
                ({ productName, images, productPrice, quantity }) => {
                  return (
                    <div className="card" key={images[0]}>
                      <div className="card-body row">
                        <div className="media">
                          <div className="row my-auto flex-column flex-md-row">
                            <div className="col align-self-center">
                              <img
                                className="img-fluid my-auto align-self-center mr-2 mr-md-4 pl-0 p-0 m-0"
                                src={`https://vovalohika.tk/images/100_${images[0]}`}
                                width="100"
                                height="56"
                                alt={`https://vovalohika.tk/images/100_${images[0]}`}
                              />
                            </div>
                            <div className="col my-auto">
                              <small>{productName}</small>
                            </div>
                            <div className="col my-auto">
                              <small>Ціна : {productPrice} $</small>
                            </div>
                            <div className="col my-auto">
                              <small>Кількість : {quantity}</small>
                            </div>
                            <div className="col my-auto">
                              <h6 className="mb-0">
                                Cума : {productPrice * quantity} $
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="col-4 mt-5">
              <div className="card">
                <div className="card-header">
                  <b>Всього</b>
                </div>
                <div className="card-body bg-light">
                  <div className="my-auto row d-flex justify-content-between">
                    {quan === 1 && (
                      <>
                        <div className="my-auto col-6">
                          {quan} товар на суму:{" "}
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                          <b>{totalSum} $</b>
                        </div>
                      </>
                    )}
                    {quan === 0 && <div className="my-auto">Кошик пустий</div>}
                    {quan > 1 && (
                      <>
                        <div className="my-auto col-6">
                          {quan} товару на суму:{" "}
                        </div>
                        <div className="col-6 d-flex flex-row-reverse">
                          <b>{totalSum} $</b>
                        </div>
                      </>
                    )}
                    <div className="row pe-0">
                      <div className="my-auto col-6">Вартість доставки: </div>
                      <div className="col-6 d-flex flex-row-reverse text-end m-0 p-0">
                        за тарифами перевізника
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="my-auto col-6">До сплати: </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      <b>{totalSum} $</b>
                    </div>
                  </div>
                  <hr />
                  <div className="px-5">
                    <Button
                      type="submit"
                      label="Замовити"
                      className="p-button-success w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default CheckOut;