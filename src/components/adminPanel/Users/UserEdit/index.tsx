import { Form, FormikProvider, useFormik } from 'formik';
import {  useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { UserInfo } from '../types';
import { EditUserSchema } from './validation';
import { Card } from "primereact/card" 
import { Helmet } from 'react-helmet';
import EclipseWidget from '../../../common/eclipse';
import InputGroup from '../../../common/InputGroup';
import { Button } from 'primereact/button';


const EditUser = () => {
  const { userData, loading } = useTypedSelector((store) => store.userCrud);
  const { updateUser , getUserById} = useActions();
  const navigator = useNavigate();
  const { id } = useParams();
  const _id = Number(id);

  const getData = useCallback(async () => {
    const data = await getUserById(_id);
    const { photo } = data;
    await setImg(`https://vovalohika.tk${photo}`);
  }, [getUserById, _id]);
  
  useEffect(() => {
    getData();
  }, [getData]);

  
  const [img, setImg] = useState<string>();

  
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue("photo", (e.target.files as FileList)[0]);
		const file = (e.target as any).files[0];
		setImg(URL.createObjectURL(file));
	};

	const onHandleSubmit = async (values: UserInfo) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));
    try {
      await updateUser(values, formData);
      navigator("/adminPanel/users");
    } catch (error) {}
  };

    const formik = useFormik({
      initialValues: userData,
      validationSchema: EditUserSchema,
      onSubmit: onHandleSubmit,
      enableReinitialize:true
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
      <Helmet>
        <title>Редагувати користувача</title>
      </Helmet>
      {loading && <EclipseWidget />}
      {!loading &&  <div className="row">
        <div className="col-3 text-center">
          <img src={img} alt="avatar" />
        </div>
        <div className="col-6">
          <Card title="Редагування">
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
                  <Button type="submit" label="Редагувати" icon="pi pi-check" />
                </div>
              </Form>
            </FormikProvider>
          </Card>
        </div>
      </div>}
    </>
  );
};

export default EditUser;