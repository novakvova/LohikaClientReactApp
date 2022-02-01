import * as React from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../common/InputGroup";
import SelectGroup from "../../common/SelectGroup";
import { useActions } from "../../../hooks/useActions";
import { IAddCar } from "./types";
import { useFormik, FormikHelpers } from "formik";
import { AddCarSchema as validationSchema } from "./validation";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse/index";
import { Helmet } from "react-helmet";
import CropperMultiple from "../../containers/CropperMultiple/CropperMultiple";
import EditorTiny from "../../common/EditorTiny/EditorTiny";

const initialValues: IAddCar = {
  name: "",
  priority: "",
  price: "",
  categoryId: 0,
  description: "",
};

const AddNewCar: React.FC = () => {
  const { addNewCar } = useActions();
  const {
    nav,
    error: serverError,
    loading,
  } = useTypedSelector((store) => store.sendingCar);

  const { fetchCategories } = useActions();

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const { categories } = useTypedSelector((store) => store.categoryCrud);

  const navigate = useNavigate();
  const { uploadCarImage } = useActions();

  const [cropImages, setCropImages] = React.useState<Array<any>>([
    "",
    "",
    "",
    "",
  ]);

  const addImageHandler = (id: number, idx: number) => {
    setCropImages((prevState) => [
      ...prevState.map((item, index) => {
        if (index === idx) {
          return id;
        } else return item;
      }),
    ]);
  };

  const removeImageHandler = (idx: number) => {
    setCropImages((prevState) => [
      ...prevState.map((item, index) => {
        if (index === idx) {
          return "";
        } else return item;
      }),
    ]);
  };

  const onSubmit = (values: IAddCar, helpers: FormikHelpers<IAddCar>) => {
    addNewCar({ ...values, ids: cropImages.filter((item) => item !== "") });
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

  const { errors, touched, handleBlur, handleChange, values, setFieldValue } =
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

        <div className="col-4 d-flex justify-content-center flex-column">
          {cropImages.map((item, idx) => {
            return (
              <CropperMultiple
                key={idx}
                onChange={() => {}}
                onChangeImage={addImageHandler}
                onRemoveHandler={removeImageHandler}
                uploadImageHandler={uploadCarImage}
                idx={idx}
                field={`i${idx}`}
              />
            );
          })}
        </div>

        <form className="col-4" onSubmit={(e) => formik.handleSubmit(e)}>
          <SelectGroup
            label="Категорія"
            field="categoryId"
            values={categories}
            onChange={handleChange}
            touched={touched.categoryId}
            error={errors.categoryId}
          />
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
          <EditorTiny
            value={values.description}
            field="description"
            label="Опис товаару"
            error={errors.description}
            touched={touched.description}
            onEditorChange={(a: string) => {
              setFieldValue("description", a);
            }}
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
