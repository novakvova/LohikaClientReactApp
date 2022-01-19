import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { CategoryInfo } from '../types';
import { EditCategorySchema } from './validation';
import { UpdateErrors } from '../types/UpdateCategory';
import { Helmet } from 'react-helmet';
import { Card } from 'primereact/card';
import CropperComponent from '../../containers/CropperComponent/CropperComponent';
import { Button } from 'primereact/button';
import { v4 as uuid } from 'uuid';

const EditCategoryPage = () => {
  const { categoryData, loading } = useTypedSelector((store) => store.categoryCrud);
  const { updateCategory, getCategoryById } = useActions();
    const { id } = useParams();
    const _id = Number(id);
  useEffect(() => {
    getCategoryById(_id);
  }, [getCategoryById, _id]);

  const navigator = useNavigate();

  
  let initValues: CategoryInfo = {
    id: _id,
    title: categoryData.title,
    urlSlug: categoryData.urlSlug,
    priority: categoryData.priority,
    image: categoryData.image,
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFieldValue('image', (e.target as any).files[0]);
  //   const file = (e.target as any).files[0];
  //   setImg(URL.createObjectURL(file));
  // };

  const onHandleSubmit = async (values: CategoryInfo) => {
    try {
      await updateCategory(values);
      navigator('/adminPanel/categories');
    } catch (error) {
      const serverErrors = error as UpdateErrors;

      console.log(serverErrors);
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: EditCategorySchema,
    onSubmit: onHandleSubmit,
    enableReinitialize: true
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } = formik;
console.log(values);

  return (
    <>
      <Helmet>
        <title>Редагувати категорію</title>
      </Helmet>
      {loading && <EclipseWidget />}
      {!loading && (
        <Card title="Редагувати категорію">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="row d-flex justify-content-around border border-secondary border-3 rounded-4 p-4 m-5">
                <div className="col-6">
                  <CropperComponent
                    field="image"
                    onChange={setFieldValue}
                    error={errors.image}
                    touched={touched.image}
                    value={`https://vovalohika.tk/images/300_${values.image}?t=${uuid()}`}
                  />
                </div>
                <div className="col-6">
                  <InputGroup
                    field="title"
                    label="Назва категорії"
                    error={errors.title}
                    touched={touched.title}
                    value={values.title}
                    onChange={handleChange}
                  />

                  <InputGroup
                    field="priority"
                    label="Пріорітет"
                    error={errors.priority}
                    touched={touched.priority}
                    value={values.priority}
                    onChange={handleChange}
                  />

                  <InputGroup
                    field="urlSlug"
                    label="urlSlug"
                    error={errors.urlSlug}
                    onChange={handleChange}
                    touched={touched.urlSlug}
                    value={values.urlSlug}
                  />

                  {/* <InputGroup
                    field="image"
                    label="Аватар"
                    type="file"
                    error={errors.image}
                    onChange={handleFileChange}
                    touched={touched.image}
                  /> */}
                </div>

                <div className="p-d-flex p-jc-center">
                  <Button
                    type="submit"
                    label="Редагувати категорію"
                    icon="pi pi-plus"
                    disabled={loading}></Button>
                </div>
              </div>
            </Form>
        <div className="col-4"></div>

          </FormikProvider>
        </Card>
      )}
    </>
  );
};
export default EditCategoryPage;
