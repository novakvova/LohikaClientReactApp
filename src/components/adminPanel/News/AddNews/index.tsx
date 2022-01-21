import { Card } from 'primereact/card';
import { IEditorValues, PhotoObj } from '../types';
import { Form, FormikProvider, useFormik } from 'formik';
import { EditorSchema } from '../validation';
import InputGroup from '../../../common/InputGroup';
import { Button } from 'primereact/button';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import "react-datepicker/dist/react-datepicker.css";
import EditorTiny from '../../../common/EditorTiny/EditorTiny';
import Callendar from '../../../common/Callendar';
import EclipseWidget from "../../../common/eclipse";

import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import CropperComponent from '../../../containers/CropperComponent/CropperComponent';
import { useRef } from 'react';
import CropperMultiple from "../../../containers/CropperMultiple/CropperMultiple"
import { Toast } from "primereact/toast";
import { Helmet } from 'react-helmet';

const TinyEditor = () => {
  const { addNews, uploadImages } = useActions();
  const { images } = useTypedSelector(store => store.news)
  const toast = useRef<Toast>(null);
  const { loading } = useTypedSelector( store => store.news);
  const cyr = new CyrillicToTranslit();
  const initialValues:IEditorValues = {
    name: "",
    text: "",
    image: "",
    slug: "",
    isShow: true,
    dateTimePublish: new Date().toLocaleDateString(),
  };  

  const uploadImng = async ( image:string ) => {
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
  }
  
  const onHandleSubmit = async (values: IEditorValues) => {
    try {
      await addNews(values);
      resetForm();
      if (toast.current !== null) {
        toast.current.show({
          severity: "info",
          summary: "Виконано",
          detail: "Новину додано",
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditorSchema,
    onSubmit: onHandleSubmit,
  });

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    resetForm
  } = formik;
 
	return (
    <>
      <Helmet>
        <title>Добавити новини</title>
      </Helmet>
      <Toast ref={toast} />
      <Card style={{ padding: "1rem" }}>
        <h1 className="text-center">Добавити новину</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3">
                <InputGroup
                  field="name"
                  label="Заголовок"
                  error={errors.name}
                  onChange={handleChange}
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
              <Button type="submit" label="Додати новину" icon="pi pi-plus" />
            </div>
          </Form>
        </FormikProvider>
        {loading && <EclipseWidget />}
      </Card>
    </>
  );
};

export default TinyEditor;