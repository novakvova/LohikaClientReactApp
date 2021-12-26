import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useActions } from '../../../../hooks/useActions';
import { ISearchUser } from '../types/SearchUsers';
import InputGroup from '../../../common/InputGroup';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Search = () => {
  const { getSearchResult } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<ISearchUser>({
    id: searchParams.get("id") || "",
    firstName: searchParams.get("firstName") || "",
    secondName: searchParams.get("secondName") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
    page: searchParams.get("page"),
  });

  useEffect(() => {
    getSearchResult(search);
  }, [getSearchResult, search]);

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
      <Card>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-4 d-flex flex-column">
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
              <div className="col-4 d-flex flex-column">
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
              <div className="col-4 d-flex flex-column">
                <InputGroup
                  field="phone"
                  label="Телефон"
                  onChange={handleChange}
                  value={values?.phone}
                />
                <div className="mt-auto p-3 align-self-end">
                  <Button type="submit" label="Шукати" icon="pi pi-search" />
                </div>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </Card>
    </>
  );
};

export default Search;
