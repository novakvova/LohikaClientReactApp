import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import {  ISearchCategory } from "../types/SearchCategories";
import { useActions } from '../../../hooks/useActions';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import classNames from 'classnames';
import Categories from '../CategoriesList/Categories';
import EclipseWidget from '../../common/eclipse';
import { Helmet } from 'react-helmet';

const CategorySearch = () => {
  const { getSearchResults } = useActions();
  const { pages, loading, currentPage, total } = useTypedSelector( store => store.userCrud)
  const [searchParams, setSearchParams] = useSearchParams();
  const [toogleSearch, setToggleSearch] = useState(false);

  const [search, setSearch] = useState<ISearchCategory>({
    id: searchParams.get("id") || "",
    title: searchParams.get("title") || "",
    urlSlug: searchParams.get("urlSlug") || "",
    priority: searchParams.get("priority") || "",
  });

  useEffect(() => {
    getSearchResults(search);
  }, [search]);

  const buttons = [];
  for (var i = 2; i < pages; i++) {
    buttons.push(i);
  }
   
 const filterNonNull = (obj: ISearchCategory) => {
   return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
 };
 
  const onHandleSubmit = (values: ISearchCategory) => {
    const searchData: ISearchCategory = {
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

  const { handleChange, handleSubmit, values } =
    formik;

  return (
    <>
      <Helmet>
        <title>Категорії</title>
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
                  field="title"
                  label="Назва категорії"
                  onChange={handleChange}
                  value={values?.title}
                />
              </div>
              <div className="col-4">
                <InputGroup
                  field="urlSlug"
                  label="urlSlug"
                  onChange={handleChange}
                  value={values?.urlSlug}
                />

                <InputGroup
                  field="priority"
                  label="priority"
                  onChange={handleChange}
                  value={values?.priority}
                />
              </div>
              <div className="col-4">
                <InputGroup
                  field="id"
                  label="id"
                  onChange={handleChange}
                  value={values?.id}
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
      <Categories />
      <h5>Всього: {total}</h5>
      <ul className="pagination d-flex justify-content-center">
        <li
          onClick={() => setSearch({ ...search, page: currentPage - 1 })}
          className={classNames("page-item m-1", {
            disabled: currentPage === 1,
          })}
        >
          <Link
            className="page-link"
            to={
              "?" +
              qs.stringify(filterNonNull({ ...search, page: currentPage - 1 }))
            }
          >
            &laquo;
          </Link>
        </li>
        <li
          className={classNames("page-item m-1", {
            active: currentPage === 1,
          })}
          onClick={() => currentPage > 1 && setSearch({ ...search, page: 1 })}
        >
          <Link
            className="page-link"
            to={"?" + qs.stringify(filterNonNull({ ...search, page: 1 }))}
          >
            1
          </Link>
        </li>
        {currentPage > 4 && (
          <li
            className="page-item m-1"
            onClick={() => setSearch({ ...search, page: currentPage - 3 })}
          >
            <Link
              className="page-link"
              to={
                "?" +
                qs.stringify(
                  filterNonNull({ ...search, page: currentPage - 3 })
                )
              }
            >
              ...
            </Link>
          </li>
        )}
        {buttons
          .filter((el) => el > currentPage - 3 && el < currentPage + 3)
          .map((item, key) => {
            const page: ISearchCategory = {
              ...search,
              page: item,
            };
            return (
              <li
                key={key}
                onClick={() => setSearch(page)}
                className={classNames("page-item m-1", {
                  active: item === currentPage,
                })}
              >
                <Link
                  className="page-link"
                  to={
                    "?" + qs.stringify(filterNonNull({ ...search, page: item }))
                  }
                >
                  {item}
                </Link>
              </li>
            );
          })}
        {currentPage < pages - 3 && (
          <li
            className="page-item m-1"
            onClick={() => setSearch({ ...search, page: currentPage + 3 })}
          >
            <Link
              className="page-link"
              to={
                "?" +
                qs.stringify(
                  filterNonNull({ ...search, page: currentPage + 3 })
                )
              }
            >
              ...
            </Link>
          </li>
        )}
        {pages >= 2 && (
          <li
            className={classNames("page-item m-1", {
              active: currentPage === pages,
            })}
            onClick={() => setSearch({ ...search, page: pages })}
          >
            <Link
              className="page-link"
              to={"?" + qs.stringify(filterNonNull({ ...search, page: pages }))}
            >
              {pages}
            </Link>
          </li>
        )}
        <li
          onClick={() =>
            currentPage < pages &&
            setSearch({ ...search, page: currentPage + 1 })
          }
          className={classNames("page-item m-1", {
            disabled: currentPage === pages,
          })}
        >
          <Link
            className="page-link"
            to={
              "?" +
              qs.stringify(filterNonNull({ ...search, page: currentPage + 1 }))
            }
          >
            &raquo;
          </Link>
        </li>
      </ul>
      {loading && <EclipseWidget />}
    <Categories/>
    </>
  );
};

export default CategorySearch;


