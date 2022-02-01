import { useFormik } from "formik";
import * as React from "react";
import { AddCarSchema as validationSchema } from "../validation";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import EclipseWidget from "../../../common/eclipse";
import InputGroup from "../../../common/InputGroup";
import { ICarUpdate } from "../../../CarsList/types";
import { Card } from "primereact/card";

import { v4 as uuid } from "uuid";
import CropperMultiple from "../../../containers/CropperMultiple/CropperMultiple";
import SelectGroup from "../../../common/SelectGroup";
import EditorTiny from "../../../common/EditorTiny/EditorTiny";

const EditCarPage = () => {
  const { updateCar, fetchCategories } = useActions();
  const [showLoader, setShowLoader] = React.useState(false);
  const { id } = useParams();
  const _id = Number(id);
  const { fetchCarById, uploadCarImage } = useActions();
  const { carSearchedById } = useTypedSelector((store) => store.car);
  const { categories } = useTypedSelector((store) => store.categoryCrud);
  const [cropImages, setCropImages] = React.useState<Array<any>>([
    "",
    "",
    "",
    "",
  ]);

  const getCarById = React.useCallback(
    async (id) => {
      try {
        setShowLoader(true);
        await fetchCarById(id);
        setShowLoader(false);
      } catch (error) {
        console.log("err = > ", error);
      }
    },
    [fetchCarById]
  );

  React.useEffect(() => {
    getCarById(_id);
  }, [getCarById, _id]);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const initCropImages = React.useCallback(() => {
    setCropImages((prevState) =>
      prevState.map((item, idx) => {
        if (carSearchedById.images[idx]) {
          return carSearchedById.images[idx].id;
        } else return item;
      })
    );
  }, [carSearchedById.images]);

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

  React.useEffect(() => {
    initCropImages();
  }, [carSearchedById, initCropImages]);

  const navigate = useNavigate();
  const onSubmit = async (values: ICarUpdate) => {
    setShowLoader(true);
    await updateCar({
      ...values,
      ids: cropImages.filter((item) => item !== ""),
    });
    setShowLoader(false);
    await navigate("/adminPanel/products");
  };

  const initialValues = {
    id: `${_id}`,
    name: `${carSearchedById?.name}`,
    priority: `${carSearchedById?.priority}`,
    price: `${carSearchedById?.price}`,
    categoryId: carSearchedById.categoryId,
    description: carSearchedById.description,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const { errors, touched, handleChange, setFieldValue } = formik;

  return (
    <>
      <Helmet>
        <title>Редагувати</title>
      </Helmet>
      <Card className="px-4">
      <div className="row">
        
        <h1 className="text-center">Редагувати запис</h1>
        {showLoader && <EclipseWidget />}
        <div className="col-4 d-flex justify-content-center flex-column">
          {cropImages.map((item, idx) => {
            return (
              <CropperMultiple
                onChange={() => {}}
                key={idx}
                onChangeImage={addImageHandler}
                onRemoveHandler={removeImageHandler}
                uploadImageHandler={uploadCarImage}
                idx={idx}
                field={`i${idx}`}
                value={
                  cropImages[idx] !== "" && carSearchedById.images[idx]
                    ? `https://vovalohika.tk/images/600_${
                        carSearchedById.images[idx].name
                      }?t=${uuid()}`
                    : ""
                }
              />
            );
          })}
        </div>

        <form className="col-8" onSubmit={(e) => formik.handleSubmit(e)}>
          <SelectGroup
            label="Категорія"
            field="categoryId"
            values={categories}
            onChange={handleChange}
            selectedValue={carSearchedById.categoryName}
            categoryId={carSearchedById.categoryId}
            touched={touched.categoryId}
            error={errors.categoryId}
          />
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

          <EditorTiny
            value={formik.values.description}
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
              Зберегти зміни
            </button>
          </div>
        </form>
      
      </div>
      </Card>
    </>
  );
};

export default EditCarPage;
