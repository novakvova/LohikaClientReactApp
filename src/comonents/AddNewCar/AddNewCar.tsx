import * as React from "react";

import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";

import { useActions } from "../../hooks/useActions";

import { IAddCar } from "./types";
import { useFormik, Form, FormikProvider, FormikHelpers } from "formik";
import { AddCarSchema } from "./validation";


const AddNewCar: React.FC = () => {
  const { addNewCar } = useActions();
  const navigate = useNavigate();

  const initialValues: IAddCar = {
    name: "",
    priority: null,
    price: null,
    image: "",
  };

  const onHandleSubmit = (values: IAddCar,
    { setFieldError }: FormikHelpers<IAddCar>) => {
    // addNewCar()

    console.log(values)
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddCarSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldError } = formik;

  return (
    <>
      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>

        <div className="col-4"></div>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="col-4">
            <InputGroup
              field="name"
              label="Машина"
              error={errors.name}
              onChange={handleChange}
              touched={touched.name}
            />

            <InputGroup
              field="priority"
              label="Приорітет"
              type="number"
              error={errors.priority}
              onChange={handleChange}
              touched={touched.priority}
            />

            <InputGroup
              field="price"
              label="Ціна"
              type="number"
              error={errors.price}
              onChange={handleChange}
              touched={touched.price}
            />

            <InputGroup
              field="image"
              label="Фото"
              type="file"
              error={errors.image}
              onChange={handleChange}
              touched={touched.image}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Додати машину
              </button>
            </div>
          </Form>
        </FormikProvider>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default AddNewCar;
