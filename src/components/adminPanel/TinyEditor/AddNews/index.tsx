import { Card } from 'primereact/card';
import { IEditorValues } from '../types';
import { Form, FormikProvider, useFormik } from 'formik';
import { EditorSchema } from '../validation';
import InputGroup from '../../../common/InputGroup';
import { Button } from 'primereact/button';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import "react-datepicker/dist/react-datepicker.css";
import EditorTiny from '../../../common/EditorTiny/EditorTiny';
import Callendar from '../../../common/Callendar';
import EclipseWidget from "../../../common/eclipse";

//import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import CropperComponent from '../../../containers/CropperComponent/CropperComponent';

const TinyEditor = () => {
 // const { addNews, getNews } = useActions();
  const { loading } = useTypedSelector( store => store.news)
  const cyr = new CyrillicToTranslit();
  const initialValues:IEditorValues = {
    name: "",
    text: "",
    image: "",
    slug: "",
    isShow: true,
    dateTimePublish: new Date().toLocaleDateString(),
  };  
  
  const onHandleSubmit = async (values: IEditorValues) => {
    try {
      //await addNews(values);
      console.log(values);
      
      resetForm();
    } catch (error) {
      
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
      <Card>
        <h1 className="text-center">Добавити новину</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-4">
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
              <div className="col-8">
                <EditorTiny
                  field="text"
                  label="Текст новини"
                  error={errors.text}
                  touched={touched.text}
                  onEditorChange={(a: string) => {
                    setFieldValue("text", a);
                  }}
                />
                <div className="form-control mb-1">
                  <CropperComponent
                    field="image"
                    onChange={setFieldValue}
                    error={errors.image}
                    touched={touched.image}
                  />
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