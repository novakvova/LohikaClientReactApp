import { Form,  FormikProvider, useFormik } from 'formik';
import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import InputGroup from '../../common/InputGroup';
import { CategoryInfo } from '../types';
import { EditCategorySchema } from './validation';
import { UpdateErrors } from "../types/UpdateCategory"
import { Helmet } from 'react-helmet';


const EditCategoryPage = () => {
	const { categoryData, loading } = useTypedSelector(store => store.categoryCrud);
  const { updateCategory } = useActions();
  const navigator = useNavigate();
  const { id } = useParams();
	const _id = Number(id);

  const [img, setImg] = useState<string>(
    `https://vovalohika.tk${categoryData?.image}`
  );

	let initValues: CategoryInfo = {
    id: _id,
    title: categoryData.title,
    urlSlug: categoryData.urlSlug,
    priority: categoryData.priority,
    image: categoryData.image,
  };

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
		setFieldValue("image", (e.target as any).files[0]);
		const file = (e.target as any).files[0];
        setImg(URL.createObjectURL(file));
	};


	const onHandleSubmit = async (values: CategoryInfo ) => {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) =>
            formData.append(key, value)
          );
    try {
      await updateCategory(values, formData);
      navigator('/admin/categories')
    } catch (error) {
      const serverErrors = error as UpdateErrors;

      console.log(serverErrors);
    }
  };

	const formik = useFormik({
    initialValues: initValues,
    validationSchema: EditCategorySchema,
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
    <div className="row">
      <Helmet>
        <title>Редагувати категорію</title>
      </Helmet>
      {loading && <EclipseWidget />}
      {!loading && (
        <>
          <div className="col-3">
            <div className="card mt-5">
              <div className="card-body text-center">
                <img src={img} alt="img" />
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <h1 className="text-center mt-4">Редагувати</h1>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <InputGroup
                  field="title"
                  label="Назва категорії"
                  error={errors.title}
                  touched={touched.title}
                  value={values.title}
                  onChange={handleChange}
                />

                <InputGroup
                  field="priopity"
                  label="Пріорітет"
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

                <InputGroup
                  field="image"
                  label="Аватар"
                  type="file"
                  error={errors.image}
                  onChange={handleFileChange}
                  touched={touched.image}
                />

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Редагувати
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </>
      )}
    </div>
  );
};
export default EditCategoryPage;

