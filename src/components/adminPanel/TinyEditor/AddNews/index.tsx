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
import { useActions } from '../../../../hooks/useActions';

const TinyEditor = () => {
  const initialValues:IEditorValues = {
    name: "",
    text: "",
    image: "",
    slug: "",
    isShow: true,
    dateTimePublish: new Date().toLocaleDateString(),
  };  

  const { addNews, getNews } = useActions();
  const cyr = new CyrillicToTranslit();
  
  const onHandleSubmit = async (values: IEditorValues) => {
    try {
      //await addNews(values);
      console.log(addNews(values));
       console.log(getNews());
      
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
                <InputGroup
                  field="image"
                  label="Картинка"
                  error={errors.image}
                  onChange={handleChange}
                  touched={touched.image}
                  value={values.image}
                />
                <InputGroup
                  field="slug"
                  label="Slug"
                  error={errors.slug}
                  onChange={handleChange}
                  onBlur={() => setFieldValue("slug", cyr.transform(values.slug, "-"))}
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
                      data.toLocaleDateString("uk-UA"))
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
              </div>
            </div>
            <div className="d-flex">
              <Button type="submit" label="Додати" icon="pi pi-plus" />
            </div>
          </Form>
        </FormikProvider>
      </Card>
    </>
  );
};

export default TinyEditor;