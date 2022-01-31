import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
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
import CropperComponent from '../../../containers/CropperComponent/CropperComponent';


const EditUser = () => {
  const { userData, loading } = useTypedSelector((store) => store.userCrud);
  const { updateUser , getUserById} = useActions();
  const navigator = useNavigate();
  const { id } = useParams();
  const _id = Number(id);

  useEffect(() => {
    getUserById(_id);
  }, [getUserById, _id]);

  const title = <h3 className="text-center">Редагування</h3>;


	const onHandleSubmit = async () => {
    try {
      await updateUser(values);
      navigator("/adminPanel/users");
    } catch (error) {
      
    }
  };

    const formik = useFormik({
      initialValues: {
        ...userData,
        photo: `https://vovalohika.tk/images/600_${userData.photo}`,
      },
      validationSchema: EditUserSchema,
      onSubmit: onHandleSubmit,
      enableReinitialize: true,
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
      {!loading && (
        <Card title={title} className='p-5'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-3 m-5">
                  <CropperComponent
                    field="photo"
                    onChange={setFieldValue}
                    error={errors.photo}
                    touched={touched.photo}
                    value={values.photo}
                  />
                </div>
                <div className="col-4">
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
                    field="phone"
                    label="Телефон"
                    error={errors.phone}
                    onChange={handleChange}
                    touched={touched.phone}
                    value={values.phone}
                  />

                  <div className="text-center">
                    <Button
                      type="submit"
                      label="Редагувати"
                      icon="pi pi-check"
                    />
                  </div>
                  <div className='col-2'></div>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </Card>
      )}
    </>
  );
};

export default EditUser;