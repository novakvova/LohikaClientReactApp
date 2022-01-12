import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import { ISearchCategory } from '../types/SearchCategories';
import { useActions } from '../../../hooks/useActions';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import classNames from 'classnames';
import Categories from '../CategoriesList/Categories';
import EclipseWidget from '../../common/eclipse';
// import "../category.css";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import CategoriesList from '../CategoriesList/Categories';

const CategorySearch = () => {
  const { getSearchCategoryResult } = useActions();
  const { pages, loading, currentPage, total } = useTypedSelector((store) => store.userCrud);
  const [searchParams, setSearchParams] = useSearchParams();
  const [toggleSearch, setToggleSearch] = useState(false);

  const [search, setSearch] = useState<ISearchCategory>({
    id: searchParams.get('id') || '',
    title: searchParams.get('title') || '',
    urlSlug: searchParams.get('urlSlug') || '',
  });

  useEffect(() => {
    getSearchCategoryResult(search);
  }, [getSearchCategoryResult, search]);

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

  const { handleChange, handleSubmit, values } = formik;

  return (
    <div className="team_dark">
      <div className="d-flex justify-content-between">
        <div className="table-header">Категорії</div>
        <Button
          label="Пошук"
          icon="pi pi-search"
          onClick={() => {
            setToggleSearch((prev) => !prev);
          }}
        />
      </div>
      {toggleSearch && (
        <Card>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="row">
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
                </div>
                <div className="col-4">
                  <InputGroup field="id" label="id" onChange={handleChange} value={values?.id} />
                </div>
                <div className="mt-auto p-3 align-self-end">
                  <Button type="submit" label="Пошук" icon="pi pi-search" />
                </div>
              </div>
            </Form>
          </FormikProvider>
        </Card>
      )}
      <Categories />
      <h5>Всього: {total}</h5>
      <ul className="pagination d-flex justify-content-center">
        <li
          onClick={() => setSearch({ ...search, page: currentPage - 1 })}
          className={classNames('page-item m-1', {
            disabled: currentPage === 1,
          })}>
          <Link
            className="page-link"
            to={'?' + qs.stringify(filterNonNull({ ...search, page: currentPage - 1 }))}>
            &laquo;
          </Link>
        </li>
        <li
          className={classNames('page-item m-1', {
            active: currentPage === 1,
          })}
          onClick={() => currentPage > 1 && setSearch({ ...search, page: 1 })}>
          <Link
            className="page-link"
            to={'?' + qs.stringify(filterNonNull({ ...search, page: 1 }))}>
            1
          </Link>
        </li>
        {currentPage > 4 && (
          <li
            className="page-item m-1"
            onClick={() => setSearch({ ...search, page: currentPage - 3 })}>
            <Link
              className="page-link"
              to={'?' + qs.stringify(filterNonNull({ ...search, page: currentPage - 3 }))}>
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
                className={classNames('page-item m-1', {
                  active: item === currentPage,
                })}>
                <Link
                  className="page-link"
                  to={'?' + qs.stringify(filterNonNull({ ...search, page: item }))}>
                  {item}
                </Link>
              </li>
            );
          })}
        {currentPage < pages - 3 && (
          <li
            className="page-item m-1"
            onClick={() => setSearch({ ...search, page: currentPage + 3 })}>
            <Link
              className="page-link"
              to={'?' + qs.stringify(filterNonNull({ ...search, page: currentPage + 3 }))}>
              ...
            </Link>
          </li>
        )}
        {pages >= 2 && (
          <li
            className={classNames('page-item m-1', {
              active: currentPage === pages,
            })}
            onClick={() => setSearch({ ...search, page: pages })}>
            <Link
              className="page-link"
              to={'?' + qs.stringify(filterNonNull({ ...search, page: pages }))}>
              {pages}
            </Link>
          </li>
        )}
        <li
          onClick={() => currentPage < pages && setSearch({ ...search, page: currentPage + 1 })}
          className={classNames('page-item m-1', {
            disabled: currentPage === pages,
          })}>
          <Link
            className="page-link"
            to={'?' + qs.stringify(filterNonNull({ ...search, page: currentPage + 1 }))}>
            &raquo;
          </Link>
        </li>
      </ul>
      {loading && <EclipseWidget />}
    </div>
  );
};

export default CategorySearch;
