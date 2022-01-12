import { Card } from 'primereact/card';
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { config } from './editorConfig';
import { IEditorValues } from '../types';
import { Form, FormikProvider, useFormik } from 'formik';
import { EditorSchema } from '../validation';
import InputGroup from '../../../common/InputGroup';
import { Button } from 'primereact/button';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import EditorTiny from '../../../common/EditorTiny/EditorTiny';
import DateCalendar from '../../../common/EditorTiny/EditorTiny';
import { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';
import classNames from 'classnames';
import Callendar from '../../../common/Callendar';

const TinyEditor = () => {
	const editorRef = useRef<any>(null);
  const [date, setDate] = useState<Date>(new Date())
  const initialValues:IEditorValues = {
    name: "",
    text: "",
    image: "",
    slug: "",
    isShow: true,
    dateTimePublish: "",
  };  

  const editorChange = (a: string, editor: TinyMCEEditor) => {
    setFieldValue("text", a);
  }

  const onHandleSubmit = (values: IEditorValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
   // validationSchema: EditorSchema,
    onSubmit: onHandleSubmit,
  });

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    values
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
                />
                <InputGroup
                  field="image"
                  label="Картинка"
                  error={errors.image}
                  onChange={handleChange}
                  touched={touched.image}
                />
                <InputGroup
                  field="slug"
                  label="Slug"
                  error={errors.slug}
                  onChange={handleChange}
                  touched={touched.slug}
                />
                <Callendar
                  field="dateTimePublish"
                  label="Дата публікації"
                  error={errors.dateTimePublish}
                  touched={touched.dateTimePublish}
                  value={values.dateTimePublish}
                  onChange={(data: Date) => {
                    setFieldValue("dateTimePublish", data.toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric" }), false);
                    console.log(
                      data.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })
                    );
                  }}
                />
              </div>
              <div className="col-8">
                <EditorTiny
                  field="text"
                  label="Text"
                  error={errors.text}
                  touched={touched.text}
                  onEditorChange={(a: string) => {
                    setFieldValue("text", a)
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