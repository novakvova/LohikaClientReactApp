import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import {  useState } from 'react';
import { useParams } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import InputGroup from '../../common/InputGroup';
import { EditUser } from '../types';
import { EditUserSchema } from './validation';


const EditPage = () => {
	const { users } = useTypedSelector(store => store.userCrud);
	const { id } = useParams();
	const _id = Number(id);
    let user = users.find(({ id }) => id === _id);

    const [img, setImg] = useState<string>(
      `https://vovalohika.tk${user?.image}`
    );

	const initValues:EditUser = {
		id: _id,
		firstName:  user?.firstName,
		secondName: user?.secondName,
		email: user?.email,
		image: user?.image,
		phone: user?.phone,
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue("photo", (e.target as any).files[0]);
		const file = (e.target as any).files[0];
        setImg(URL.createObjectURL(file));
	};

	const onHandleSubmit = async (values: EditUser, {setFieldError}: FormikHelpers<EditUser>) => {
		const formData = new FormData();
        Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
	  
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: EditUserSchema,
		onSubmit: onHandleSubmit,
		enableReinitialize: true,
	});

	const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

	return (
    <div className="row">
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
              value={initValues.firstName}
              onChange={handleChange}
            />

            <InputGroup
              field="lastName"
              label="Прізвище"
              error={errors.secondName}
              onChange={handleChange}
              touched={touched.firstName}
              value={initValues.secondName}
            />

            <InputGroup
              field="email"
              label="Email"
              error={errors.email}
              onChange={handleChange}
              touched={touched.email}
              value={initValues.email}
            />

            <InputGroup
              field="photo"
              label="Аватар"
              type="file"
              error={errors.image}
              onChange={handleFileChange}
              touched={touched.image}
            />

            <InputGroup
              field="phone"
              label="Телефон"
              error={errors.phone}
              onChange={handleChange}
              touched={touched.phone}
              value={initValues.phone}
            />

            <div className="text-center">
              <button type="submit" className="btn btn-secondary">
                Редагувати
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      {/* <div className="col-3"></div>
				{loading && <EclipseWidget />} */}
    </div>
  );
};
export default EditPage;

