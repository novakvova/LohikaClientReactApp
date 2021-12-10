import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import { IUserSearch } from './types';
import { useQueryParam } from '../../../hooks/useQueryParam';
import { useActions } from '../../../hooks/useActions';
import SearchResult from './SearchResult';
const UserSearch = () => {

  const { getSearchResult } = useActions();
  let [search, setSearch] = useQueryParam<IUserSearch>("search");
   if (!search) {
     search = { id: undefined, firstName: "", secondName: "", email: "", phone: "", page:1 };
   }
  
  const initialValues: IUserSearch = {
    id: search?.id,
    firstName: search?.firstName,
    secondName: search?.secondName,
    email: search?.email,
    phone: search?.phone,
    page: search?.page
  };
  
  const onHandleSubmit = async ( values: IUserSearch ) => {
    await setSearch(values, {replace: true});
    await getSearchResult(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onHandleSubmit,
  });

  const { handleChange, handleSubmit, values } = formik;

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
                type="number"
                onChange={handleChange}
                value={values?.id as number}
              />

              <InputGroup
                field="firstName"
                label="Ім'я"
                onChange={handleChange}
                value={values?.firstName}
              />

              <InputGroup
                field="secondName"
                label="Прізвище"
                onChange={handleChange}
                value={values?.secondName}
              />
            </div>
            <div className="col-6">
              <InputGroup
                field="email"
                label="Email"
                onChange={handleChange}
                value={values?.email}
              />

              <InputGroup
                field="phone"
                label="Телефон"
                onChange={handleChange}
                value={values?.phone}
              />
              <button type="submit" className="btn btn-primary text-center">
                Пошук
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
      <SearchResult />
    </>
  );
};

export default UserSearch;