import * as React from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";
import { useActions } from "../../hooks/useActions";
import { IAddCar } from "./types";
import { useFormik, FormikHelpers } from "formik";
import { AddCarSchema as validationSchema } from "./validation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EclipseWidget from "../common/eclipse/index";
import { Helmet } from "react-helmet";

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

  const [img, setImg] = React.useState<string>();

  const onSubmit = (values: IAddCar, helpers: FormikHelpers<IAddCar>) => {
    addNewCar(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  const handleImageChange = React.useCallback(
    (e) => {
      const file = (e.target.files as FileList)[0];
      formik.setFieldValue("image", file);
      setImg(URL.createObjectURL(file));
    },

    []
  );

  React.useEffect(() => {
    if (nav) {
      navigate("/");
    }
  }, [nav, serverError]);

  return (
    <>
      <Helmet>
        <title>Додати машину</title>
      </Helmet>
      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>
        {serverError && <h2>{serverError}</h2>}
        {loading && <EclipseWidget />}
        <div className="col-4">
          {img && (
            <div className="card mt-1 h-100">
              <div className="card-body text-center">
                <img className="h-100 w-100" src={img} alt="asdasd" />
              </div>
            </div>
          )}
        </div>

        <form className="col-4" onSubmit={(e) => formik.handleSubmit(e)}>
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
