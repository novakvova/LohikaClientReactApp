import * as React from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import { IAddCar } from "./types";
import { useFormik, FormikHelpers } from "formik";
import { AddCarSchema as validationSchema } from "./validation";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse/index";
import { Helmet } from "react-helmet";
import CropperComponent from "../../containers/CropperComponent/CropperComponent";

const initialValues: IAddCar = {
  name: "",
  priority: "",
  price: "",
  image: "",
};

const AddNewCar: React.FC = () => {
  const { addNewCar } = useActions();
  const {
    nav,
    error: serverError,
    loading,
  } = useTypedSelector((store) => store.sendingCar);
  const navigate = useNavigate();

  const onSubmit = (values: IAddCar, helpers: FormikHelpers<IAddCar>) => {
    console.log("values", values);
    addNewCar(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  React.useEffect(() => {
    if (nav) {
      navigate("/");
    }
  }, [nav, serverError, navigate]);

  const { setFieldValue, errors, touched, handleBlur, handleChange, values } =
    formik;

  return (
    <>
      <Helmet>
        <title>Додати машину</title>
      </Helmet>

      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>
        {serverError && <h2>{serverError}</h2>}
        {loading && <EclipseWidget />}
        <div className="col-4 ">
          <CropperComponent
            field="image"
            onChange={setFieldValue}
            error={errors.image}
            touched={touched.image}
          />
        </div>

        <form className="col-4" onSubmit={(e) => formik.handleSubmit(e)}>
          <InputGroup
            field="name"
            label="Ім'я"
            type="text"
            touched={touched.name}
            error={errors.name}
            value={values.name as string}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputGroup
            field="priority"
            label="Приорітет"
            type="number"
            touched={touched.priority}
            error={errors.priority}
            value={values.priority as string}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <InputGroup
            field="price"
            label="Ціна"
            type="number"
            touched={touched.price}
            error={errors.price}
            value={values.price as string}
            onChange={handleChange}
            onBlur={handleBlur}
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
