import { useFormik } from "formik";
import * as React from "react";
import { AddCarSchema as validationSchema } from "./validation";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse";
import InputGroup from "../../common/InputGroup";
import { ICarUpdate } from "../types";
import CropperComponent from "../../containers/CropperComponent/CropperComponent";
import { v4 as uuid } from "uuid";

const EditCarPage = () => {
  const { updateCar } = useActions();

  const [showLoader, setShowLoader] = React.useState(false);
  const { id } = useParams();
  const { fetchCarById } = useActions();
  const { carSearchedById } = useTypedSelector((store) => store.car);
  const [img, setImg] = React.useState<string>("");

  

  const initialValues = {
    id: `${id}`,
    name: `${carSearchedById?.name}`,
    priority: `${carSearchedById?.priority}`,
    price: `${carSearchedById?.price}`,
    image: `${carSearchedById?.image}`,
    categoryId: 85,
  };

  const getCarById = React.useCallback(async () => {
    try {
      setShowLoader(true);
      const data = await fetchCarById(Number(id));
      setShowLoader(false);
      const { image } = data;
      setImg(`https://vovalohika.tk/images/600_${image}?t=${uuid()}`);
    } catch (error) {
      console.log("err = > ", error);
    }
  }, [fetchCarById, id]);

  React.useEffect(() => {
    getCarById();
  }, [getCarById]);

  const navigate = useNavigate();
  const onSubmit = async (values: ICarUpdate) => {
    setShowLoader(true);
    await updateCar(values);
    setShowLoader(false);
    await navigate("/cars");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  const { setFieldValue, errors, touched } = formik;

  return (
    <>
      <Helmet>
        <title>Редагувати</title>
      </Helmet>
      <div className="row">
        <h1 className="text-center">Редагувати запис</h1>
        {showLoader && <EclipseWidget />}
        <div className="col-4">
          <CropperComponent
            field="image"
            onChange={setFieldValue}
            error={errors.image}
            touched={touched.image}
            value={img}
          />
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
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Зберегти зміни
            </button>
          </div>
        </form>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default EditCarPage;
