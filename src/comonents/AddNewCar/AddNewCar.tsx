import * as React from "react";

import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";

import { useActions } from "../../hooks/useActions";

import { IAddCar } from "./types";
import { useFormik, FormikHelpers } from "formik";
import { AddCarSchema as validationSchema } from "./validation";
import { ICarToAdd } from "../../types/cart";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const initialValues: IAddCar = {
  name: '',
  priority: '',
  price: '',
  image: ''
};

const AddNewCar: React.FC = () => {
  const { addNewCar } = useActions();
  const { nav, error: serverError, loading } = useTypedSelector((store) => store.sendingCar);
  const navigate = useNavigate();

  const onSubmit = (values: IAddCar, helpers: FormikHelpers<IAddCar>) => {
    addNewCar(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true
  });

  const handleImageChange = React.useCallback(
    (e) => formik.setFieldValue('image', (e.target.files as FileList)[0]),
    [],
  );

  React.useEffect(() => {
    if(nav) {
      navigate('/');
    }
  }, [nav, serverError]);

  return (
    <>
      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>
        {serverError && (<h2>{serverError}</h2>)}
        {loading && (<h3>TODO: show loading spinner</h3>)}
        <div className="col-4"></div>
        
          <form  className="col-4" onSubmit={(e)=> formik.handleSubmit(e)}>
            <InputGroup
              field="name"
              label="Ім'я"
              type="text"
              touched={formik.touched.name}
              error={formik.errors.name}
              value={formik.values.name as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <InputGroup
              field="priority"
              label="Приорітет"
              type="number"
              touched={formik.touched.priority}
              error={formik.errors.priority}
              value={formik.values.priority as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <InputGroup
              field="price"
              label="Ціна"
              type="number"
              touched={formik.touched.price}
              error={formik.errors.price}
              value={formik.values.price as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <InputGroup
              field="image"
              label="Фото"
              type="file"
              touched={formik.touched.image}
              error={formik.errors.image}
              onChange={handleImageChange}
            />

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Додати машину
              </button>
            </div>
          </form>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default AddNewCar;
