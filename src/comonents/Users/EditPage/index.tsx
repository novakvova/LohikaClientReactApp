import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import InputGroup from '../../common/InputGroup';
import { EditUser } from '../types';
import { EditUserSchema } from './validation';


const EditPage = () => {
	const { users } = useTypedSelector(store => store.userCrud);
	const { id } = useParams();
	const _id = Number(id);
	let user: EditUser | undefined;
	useEffect(() => {
		user = users.find( ({id}) => id === _id )
	}, [])


	const initValues:EditUser = {
		id: _id,
		firstName:  user?.firstName,
		lastName: user?.lastName,
		email: user?.email,
		photo: user?.photo,
		phone: user?.phone,
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue("photo", (e.target as any).files[0]);
	};
	const onHandleSubmit = async (values: EditUser, {setFieldError}: FormikHelpers<EditUser>) => {
		console.log(users);
		
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: EditUserSchema,
		onSubmit: onHandleSubmit
	});

	const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

	return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 mb-4">
        <h1 className="text-center mt-4">Редагувати</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <InputGroup
              field="firstName"
              label="Ім'я"
              error={errors.firstName}
              onChange={handleChange}
              touched={touched.firstName}
            />

            <InputGroup
              field="lastName"
              label="Прізвище"
              error={errors.lastName}
              onChange={handleChange}
              touched={touched.firstName}
            />

            <InputGroup
              field="email"
              label="Email"
              error={errors.email}
              onChange={handleChange}
              touched={touched.email}
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
            />

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-secondary"
              >
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

