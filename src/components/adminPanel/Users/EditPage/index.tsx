import { Form,  FormikProvider, useFormik } from 'formik';
import {  useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import EclipseWidget from '../../../common/eclipse';
import InputGroup from '../../../common/InputGroup';
import { UserInfo } from '../types';
import { EditUserSchema } from './validation';
import { UpdateErrors } from "../types/UpdateUser"
import { Helmet } from 'react-helmet';


const EditPage = () => {
	const { userData, loading } = useTypedSelector(store => store.userCrud);
  const { updateUser } = useActions();
  const navigator = useNavigate();
  const { id } = useParams();
	const _id = Number(id);

  const [img, setImg] = useState<string>(
    `https://vovalohika.tk${userData?.photo}`
  );

	let initValues: UserInfo = {
    id: _id,
    firstName: userData.firstName,
    secondName: userData.secondName,
    phone: userData.phone,
    email: userData.email,
    photo: userData.photo,
  };

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
		setFieldValue("photo", (e.target as any).files[0]);
		const file = (e.target as any).files[0];
        setImg(URL.createObjectURL(file));
	};


	const onHandleSubmit = async (values: UserInfo ) => {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) =>
            formData.append(key, value)
          );
    try {
      await updateUser(values, formData);
      navigator('/adminPanel/users')
    } catch (error) {
      const serverErrors = error as UpdateErrors;
    }
  };

	const formik = useFormik({
    initialValues: initValues,
    validationSchema: EditUserSchema,
    onSubmit: onHandleSubmit,
  });

	const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    setFormikState
  } = formik;

	return (
    <div className="row">
      <Helmet>
        <title>Редагувати користувача</title>
      </Helmet>
      {loading && <EclipseWidget />}
      {!loading && (
        <>
          <div className="col-3">
            <div className="card mt-5">
              <div className="card-body text-center">
                <img src={img} alt="asdasd" />
              </div>
            </div>
          </div>
          <div className="col-6 mb-4">
            <h1 className="text-center mt-4">Редагувати</h1>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <InputGroup
                  field="firstName"
                  label="Ім'я"
                  error={errors.firstName}
                  touched={touched.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                />

                <InputGroup
                  field="secondName"
                  label="Прізвище"
                  error={errors.secondName}
                  onChange={handleChange}
                  touched={touched.secondName}
                  value={values.secondName}
                />

                <InputGroup
                  field="email"
                  label="Email"
                  error={errors.email}
                  onChange={handleChange}
                  touched={touched.email}
                  value={values.email}
                />

                <InputGroup
                  field="photo"
                  label="Аватар"
                  type="file"
                  error={errors.photo}
                  onChange={handleFileChange}
                  touched={touched.photo}
                />

                <InputGroup
                  field="phone"
                  label="Телефон"
                  error={errors.phone}
                  onChange={handleChange}
                  touched={touched.phone}
                  value={values.phone}
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
export default EditPage;

