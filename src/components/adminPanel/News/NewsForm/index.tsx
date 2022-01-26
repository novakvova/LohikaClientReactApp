import { Card } from "primereact/card";
import { IEditorValues, PhotoObj } from "../types";
import { Form, FormikProvider, useFormik } from "formik";
import { EditorSchema } from "../validation";
import InputGroup from "../../../common/InputGroup";
import { Button } from "primereact/button";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import "react-datepicker/dist/react-datepicker.css";
import EditorTiny from "../../../common/EditorTiny/EditorTiny";
import Callendar from "../../../common/Callendar";
import EclipseWidget from "../../../common/eclipse";
import { InputSwitch } from "primereact/inputswitch";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import CropperComponent from "../../../containers/CropperComponent/CropperComponent";
import {  useRef } from "react";
import CropperMultiple from "../../../containers/CropperMultiple/CropperMultiple";
import { Toast } from "primereact/toast";
import { useNavigate } from 'react-router-dom';
import { AddNewsActions } from '../AddNews/types';
import { EditNewsActions } from '../EditNews/types';

interface FormProps {
  initVal: IEditorValues;
  addUpdateHandler: (
    data: IEditorValues
  ) => (
    dispatch: React.Dispatch<AddNewsActions | EditNewsActions>
  ) => Promise<void>;
  buttonText: string;
  header: string;
  toaastDetail: string;
}

const FormNews = (props: FormProps) => {
  const navigate = useNavigate();
  const { uploadImages } = useActions();
  const { images } = useTypedSelector((store) => store.news);
  const toast = useRef<Toast>(null);
  const { loading } = useTypedSelector((store) => store.news);
  const cyr = new CyrillicToTranslit();
  const { initVal, addUpdateHandler, buttonText, header, toaastDetail } = props;
  const initialValues = initVal

  const uploadImng = async (image: string) => {
    try {
      await uploadImages(image);
      if (toast.current !== null) {
        toast.current.show({
          severity: "info",
          summary: "Виконано",
          detail: "Фото додано",
          life: 3000,
        });
      }
    } catch (error) {
      if (toast.current !== null) {
        toast.current.show({
          severity: "error",
          summary: "Виконано",
          detail: "Щось пішло не так",
          life: 3000,
        });
      }
    }
  };

  const onHandleSubmit = async (values: IEditorValues) => {
    try {

      const obj = {...values};

          if (values.image.startsWith("http")) {
             obj.image = ""
       }
          
      await addUpdateHandler(obj);
      if (toast.current !== null) {
        toast.current.show({
          severity: "info",
          summary: "Виконано",
          detail: toaastDetail,
          life: 3000,
        });
      }
      navigate("/adminPanel/newsList");
    } catch (error) {
      if (toast.current !== null) {
        toast.current.show({
          severity: "error",
          summary: "Виконано",
          detail: "Щось пішло не так",
          life: 3000,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditorSchema,
    onSubmit: onHandleSubmit,
    enableReinitialize: true
  });

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
  } = formik;

  return (
    <>
      <Toast ref={toast} />
      <Card style={{ padding: "1rem" }}>
        <h1 className="text-center">{header}</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3">
                <InputGroup
                  field="name"
                  label="Заголовок"
                  error={errors.name}
                  onChange={handleChange}
                  onBlur={() =>
                    setFieldValue("slug", cyr.transform(values.name, "-"))
                  }
                  touched={touched.name}
                  value={values.name}
                />

                <label htmlFor="image">Фото новини</label>
                <div className="form-control mb-1">
                  <CropperComponent
                    field="image"
                    onChange={setFieldValue}
                    error={errors.image}
                    touched={touched.image}
                    value={values.image}
                  />
                </div>
                <label htmlFor="isShow">Відображення новини</label>

                <div className="m-2">
                  <InputSwitch
                    checked={values.isShow}
                    onChange={(e) => setFieldValue("isShow", e.value)}
                  />
                </div>

                <InputGroup
                  field="slug"
                  label="Slug"
                  error={errors.slug}
                  onChange={handleChange}
                  onBlur={() =>
                    setFieldValue("slug", cyr.transform(values.slug, "-"))
                  }
                  touched={touched.slug}
                  value={values.slug}
                />
                <Callendar
                  field="dateTimePublish"
                  label="Дата публікації"
                  error={errors.dateTimePublish}
                  touched={touched.dateTimePublish}
                  value={values.dateTimePublish}
                  onChange={(data: Date) => {
                    setFieldValue(
                      "dateTimePublish",
                      data.toLocaleDateString("uk-UA")
                    );
                    console.log(values.dateTimePublish);
                    
                  }}
                />
              </div>
              <div className="col-9">
                <EditorTiny
                  value={values.text}
                  field="text"
                  label="Текст новини"
                  error={errors.text}
                  touched={touched.text}
                  onEditorChange={(a: string) => {
                    setFieldValue("text", a);
                  }}
                />
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="addImage" className=" p-2">
                      Загрузити картинки
                    </label>
                    <CropperMultiple
                      onChange={() => {}}
                      field="addImage"
                      uploadImageHandler={uploadImng}
                    />
                  </div>
                  <div className="col-9">
                    <label htmlFor="addImage" className=" p-2">
                      Адреси картинок
                    </label>
                    <p className="form-control h-100">
                      {images.map((el: PhotoObj, i: number) => (
                        <p key={i}>{el.name}</p>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <Button type="submit" label={buttonText} icon="pi pi-plus" />
            </div>
          </Form>
        </FormikProvider>
        {loading && <EclipseWidget />}
      </Card>
    </>
  );
};

export default FormNews;
