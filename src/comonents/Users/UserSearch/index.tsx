import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import { IUrlSearch, IUserSearch } from './types';
import { useQueryParam } from '../../../hooks/useQueryParam';
import { useActions } from '../../../hooks/useActions';
import SearchResult from './SearchResult';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useEffect } from 'react';
const UserSearch = () => {
	
  const {  data:{pages} } = useTypedSelector((store) => store.userSearch);
  const { getSearchResult } = useActions();
  let [search, setSearch] = useQueryParam<IUrlSearch>("search");
  useEffect(() => {
    if (!search) {
      search = {
        id: undefined,
        firstName: "",
        secondName: "",
        email: "",
        phone: "",
        page: 1,
      };
    } else {
      getSearchResult(search, search.page);
    }
  }, []);
   

   const countPage = (): Array<number> => {
     let page: Array<number> = [];
     for (let i = 0; i < pages; i++) {
       page[i] = i + 1;
     }
     return page;
   };

   const handlePagination = (page: number) => {
      setSearch({ ...values, page }, { replace: true });
      getSearchResult(values, page);
   };
  
  const initialValues: IUserSearch = {
    id: search?.id,
    firstName: search?.firstName,
    secondName: search?.secondName,
    email: search?.email,
    phone: search?.phone,
  };
  
  const onHandleSubmit = ( values: IUserSearch ) => {
    setSearch({ ...values, page:1}, { replace: true });
    getSearchResult(values, 1);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onHandleSubmit,
  });

  const { handleChange, handleSubmit, values} =
    formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-center border border-secondary border-3 rounded-4 p-4 m-5">
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

              <button
                type="submit"
                className="btn btn-primary align-self-center"
              >
                Пошук
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
      {}
      <SearchResult />
      <div className="d-flex justify-content-center">
        <ul className="pagination">
          {countPage().map((el) => (
            <li key={el} className="page-item active">
              <button
                className="page-link"
                onClick={() => {
                  handlePagination(el);
                }}
              >
                {el}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserSearch;


