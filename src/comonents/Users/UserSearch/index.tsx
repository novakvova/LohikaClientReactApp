import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import { IUserSearch } from './types';

const UserSearch = () => {
  const initialValues: IUserSearch = {
	id:undefined, 
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
  };
  
  const onHandleSubmit = async (
    values: IUserSearch,
    { setFieldError }: FormikHelpers<IUserSearch>
  ) => {
   
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-around border border-secondary border-3 rounded-4 p-4 m-5">
            <h1 className="text-center">Пошук</h1>
            <div className="col-6">
              <InputGroup
                field="id"
                label="Id"
                error={errors.id}
                onChange={handleChange}
                touched={touched.id}
              />

              <InputGroup
                field="firstName"
                label="Ім'я"
                error={errors.firstName}
                onChange={handleChange}
                touched={touched.firstName}
              />

              <InputGroup
                field="secondName"
                label="Прізвище"
                error={errors.secondName}
                onChange={handleChange}
                touched={touched.secondName}
              />

              <InputGroup
                field="email"
                label="Email"
                error={errors.email}
                onChange={handleChange}
                touched={touched.email}
              />
            </div>
            <div className="col-6">
              <InputGroup
                field="phone"
                label="Телефон"
                error={errors.phone}
                onChange={handleChange}
                touched={touched.phone}
              />
            </div>
            <button type="submit" className="btn btn-primary text-center">
              Пошук
            </button>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};

export default UserSearch;