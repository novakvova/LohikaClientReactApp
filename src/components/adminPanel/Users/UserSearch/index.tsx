import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../../common/InputGroup';
import {  ISearchUser } from "../types/SearchUsers";
import { useActions } from '../../../../hooks/useActions';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import classNames from 'classnames';
import Users from '../UserList';
import EclipseWidget from '../../../common/eclipse';
import { Helmet } from 'react-helmet';
import  Paginator  from '../Paginator/index';

const UserSearch = () => {
  const { getSearchResult } = useActions();
  const { pages, loading, currentPage, total } = useTypedSelector( store => store.userCrud)
  const [searchParams, setSearchParams] = useSearchParams();
  const [toogleSearch, setToggleSearch] = useState(false);

  const [search, setSearch] = useState<ISearchUser>({
    id: searchParams.get("id") || "",
    firstName: searchParams.get("firstName") || "",
    secondName: searchParams.get("secondName") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "" ,
    page: searchParams.get("page"),
  });

  useEffect(() => {
    getSearchResult(search);
  }, [search]);

   
 const filterNonNull = (obj: ISearchUser) => {
   return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
 };
 
  const onHandleSubmit = (values: ISearchUser) => {
    const searchData: ISearchUser = {
      ...values,
      page: 1,
    };
    setSearchParams(qs.stringify(filterNonNull(searchData)));
    setSearch(searchData);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit: onHandleSubmit,
  });

  const { handleChange, handleSubmit, values } = formik;

  return (
    <>
      <Helmet>
        <title>Користувачі</title>
      </Helmet>
      <button
        className="btn btn-primary m-3"
        onClick={() => setToggleSearch((prev) => !prev)}
      >
        Пошук
      </button>
      {toogleSearch && (
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center border border-secondary border-3 rounded-4 p-4 m-5">
              <h1 className="text-center">Пошук</h1>
              <div className="col-4">
                <InputGroup
                  field="id"
                  label="Id"
                  type="number"
                  onChange={handleChange}
                  value={values?.id}
                />

                <InputGroup
                  field="firstName"
                  label="Ім'я"
                  onChange={handleChange}
                  value={values?.firstName}
                />
              </div>
              <div className="col-4">
                <InputGroup
                  field="secondName"
                  label="Прізвище"
                  onChange={handleChange}
                  value={values?.secondName}
                />

                <InputGroup
                  field="email"
                  label="Email"
                  onChange={handleChange}
                  value={values?.email}
                />
              </div>
              <div className="col-4">
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
      )}
      <Users />
      <Paginator />
      {loading && <EclipseWidget />}
    </>
  );
};

export default UserSearch;


