import * as React from 'react';
import { Helmet } from 'react-helmet';
import { IAddCategory } from './types';
import InputGroup from '../../common/InputGroup';
import { Form, useFormik, FormikHelpers, FormikProvider } from 'formik';
import {  AddCategorySchema } from './validation';
import { useActions } from '../../../hooks/useActions';

const initialValues: IAddCategory = {
  title: '',
  priority: 0,
  urlSlug: '',
  image: '',
};

const AddNewCategory: React.FC = () => {
  const { addNewCategory } = useActions();
  const [img, setImg] = React.useState<string>();

  const onSubmit = (values: IAddCategory, helpers: FormikHelpers<IAddCategory>) => {
    addNewCategory(values);
    console.log('values');
  };

  const formik = useFormik({
    initialValues,
    validationSchema:AddCategorySchema,
    onSubmit,
  });

  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue
  } = formik;

  const handleImageChange = React.useCallback((e) => {
    const file = (e.target.files as FileList)[0];
    setFieldValue('image', file);
    setImg(URL.createObjectURL(file));
  }, []);
  return (
    <>
      <Helmet>
        <title>Додати категорію</title>
      </Helmet>
      <h1 className="text-center">Додати категорію</h1>
      <FormikProvider value={formik}>
      <Form
        onSubmit={handleSubmit}>
        <InputGroup
          field="title"
          label="Назва категорії"
          type="text"
          touched={touched.title}
          error={errors.title}
          value={values.title}
          onChange={handleChange}
        />

        <InputGroup
          field="priority"
          label="Приорітет"
          type="number"
          touched={touched.priority}
          error={errors.priority}
          value={values.priority}
          onChange={handleChange}
        />

        <InputGroup
          field="urlSlug"
          label="urlSlug"
          type="string"
          touched={touched.urlSlug}
          error={errors.urlSlug}
          value={values.urlSlug }
          onChange={handleChange}
        />

        <InputGroup
          field="image"
          label="Фото"
          type="file"
          touched={touched.image}
          error={errors.image}
          onChange={handleImageChange}
        />
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Додати категорію
          </button>
        </div>
      </Form>
      </FormikProvider>
      
    </>
  );
};

export default AddNewCategory;
