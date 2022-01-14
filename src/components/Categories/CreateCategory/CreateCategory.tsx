import React, { useState } from 'react';
import InputGroup from '../../common/InputGroup';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router';
import { CreateCategorySchema } from './validation';
import { ICreateCategory, ICreateCategoryError } from '../types/CreateCategory';
import { IStatus } from '../types';
import EclipseWidget from '../../common/eclipse';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import CropperComponent from '../../containers/CropperComponent/CropperComponent';

const CreateCategory = () => {
  const { CreateCategory, addFlashMessage, deleteFlashMessage } = useActions();
  const { loading } = useTypedSelector((store) => store.userCrud);
  const [load, setLoad] = useState<boolean>(false);
  const navigator = useNavigate();
  const initialValues: ICreateCategory = {
    title: '',
    priority: '',
    urlSlug: '',
    image: [],
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('image', (e.target as any).files[0]);
  };

  const onHandleSubmit = async (
    values: ICreateCategory,
    { setFieldError }: FormikHelpers<ICreateCategory>,
  ) => {
    try {
      setLoad(true);
      const res = await CreateCategory(values);
      console.log(res);

      const result = (await res) as IStatus;
      navigator('/adminPanel/categories/');
      setLoad(false);
      if (result.status === 200) {
        addFlashMessage({
          type: 'success',
          message: 'Категорію створено',
        });
        setTimeout(() => deleteFlashMessage(), 2000);
      }
    } catch (err) {
      setLoad(false);
      const serverErrors = err as ICreateCategoryError;
      const { title, priority } = serverErrors;
      if (title?.length !== 0) setFieldError('title', title[0]);
      if (priority?.length !== 0) setFieldError('priority', priority[0]);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateCategorySchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <>
      <Helmet>
        <title>Додати категорію</title>
      </Helmet>
      <Card title="Додати категорію">
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-around border border-secondary border-3 rounded-4 p-4 m-5">
              <div className="col-6">
                <CropperComponent
                  field="image"
                  onChange={setFieldValue}
                  error={errors.image}
                  touched={touched.image}
                />
              </div>
              <div className="col-6">
                <InputGroup
                  field="title"
                  label="Назва"
                  error={errors.title}
                  onChange={handleChange}
                  touched={touched.title}
                />

                <InputGroup
                  field="priority"
                  label="Пріорітет"
                  error={errors.priority}
                  onChange={handleChange}
                  touched={touched.priority}
                />

                <InputGroup
                  field="urlSlug"
                  label="urlSlug"
                  error={errors.urlSlug}
                  onChange={handleChange}
                  touched={touched.urlSlug}
                />
                {/* <InputGroup field="image" label="Аватар" type="file" onChange={handleFileChange} /> */}
              </div>
              
                <div className="p-d-flex p-jc-center">
                  <Button
                    type="submit"
                    label="Додати категорію"
                    icon="pi pi-plus"
                    disabled={loading}
                  />
                </div>
             
            </div>
          </Form>
        </FormikProvider>
      </Card>
      {load && <EclipseWidget />}
    </>
  );
};
export default CreateCategory;
