import { useFormik } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import { useActions } from "../../../hooks/useActions";
import { ISearchProduct } from "../types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import qs from "qs";

import { useEffect, useState } from "react";

const CarSearch = () => {
  const { fetchCarsSearch } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<ISearchProduct>({
    id: searchParams.get("id") || "",
    name: searchParams.get("name") || "",
    price: searchParams.get("price") || "",
    priority: searchParams.get("priority") || "",
    page: searchParams.get("page"),
  });

  const [showSearchForm, setShowSearchForm] = useState(
    !!searchParams.get("id") ||
      !!searchParams.get("name") ||
      !!searchParams.get("price") ||
      !!searchParams.get("priority")
  );
  const { pages, currentPage } = useTypedSelector((store) => store.car);

  const buttons = [];
  for (let i = 2; i < pages; i++) {
    buttons.push(i);
  }

  useEffect(() => {
    fetchCarsSearch(search);
  }, [search]);

  function filterNonNull(obj: ISearchProduct) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  }

  const onSubmit = (values: ISearchProduct) => {
    const searchData: ISearchProduct = {
      ...values,
      page: 1,
    };
    setSearchParams(qs.stringify(filterNonNull(searchData)));
    setSearch(searchData);
  };

  const onHideSearchHandler = () => {
    setSearch({});
    setSearchParams({});
    setShowSearchForm(false);
  };

  const onShowSearchHandler = () => {
    setShowSearchForm(true);
  };

  const formik = useFormik({
    initialValues: search,
    onSubmit,
  });

  return (
    <div>
      {!showSearchForm && (
        <div className="w-100 mt-3  d-flex justify-content-center">
          <button
            onClick={onShowSearchHandler}
            className="btn mx-auto mb-3 w-25 btn-secondary"
            type="button"
          >
            Знайти машину
          </button>
        </div>
      )}

      {showSearchForm && (
        <form
          className=" w-100 d-flex flex-wrap border border-secondary rounded-3 position-relative"
          onSubmit={formik.handleSubmit}
        >
          <button
            onClick={onHideSearchHandler}
            type="button"
            className="btn-close position-absolute top-0 end-0"
          ></button>

          <div className="mb-3 p-3 w-25 ">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="number"
              value={formik.values.id}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по ID машини"
            />
          </div>
          <div className="mb-3 p-3 w-25  ">
            <label htmlFor="name" className="form-label">
              Назва машини
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по назві машини"
            />
          </div>
          <div className="mb-3 p-3 w-25  ">
            <label htmlFor="price" className="form-label">
              Ціна
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по Ціні машини"
            />
          </div>
          <div className="mb-3 p-3 w-25  ">
            <label htmlFor="priority" className="form-label">
              Приорітет
            </label>
            <input
              id="priority"
              name="priority"
              type="number"
              value={formik.values.priority}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="пошук по Приорітету машини"
            />
          </div>
          <button type="submit" className="btn mx-auto mb-3 w-25 btn-secondary">
            <span>
              <i className="fa fa-search"></i>
            </span>
            <span>Пошук</span>
          </button>
        </form>
      )}

      <div className="w-100 mt-3  d-flex justify-content-center">
        <ul className="pagination">
          {currentPage > 1 && (
            <li className={classNames("page-item ")}>
              <Link
                className="page-link"
                onClick={() => setSearch({ ...search, page: currentPage - 1 })}
                to={
                  "?" +
                  qs.stringify(
                    filterNonNull({ ...search, page: currentPage - 1 })
                  )
                }
              >
                {"<"}
              </Link>
            </li>
          )}
          <li
            className={classNames("page-item", {
              active: currentPage == 1,
            })}
          >
            <Link
              className="page-link"
              onClick={() => setSearch({ ...search, page: 1 })}
              to={"?" + qs.stringify(filterNonNull({ ...search, page: 1 }))}
            >
              {1}
            </Link>
          </li>
          {currentPage > 3 && <span>...</span>}
          
          {buttons
            .filter(
              (item) =>
                item - 1 === currentPage ||
                item === currentPage ||
                item + 1 === currentPage
            )
            .map((item, key) => {
              const page: ISearchProduct = {
                ...search,
                page: item,
              };

              return (
                <li
                  key={key}
                  onClick={() => setSearch(page)}
                  className={classNames("page-item ms-1 me-1", {
                    active: item == currentPage,
                  })}
                >
                  <Link
                    className="page-link"
                    to={"?" + qs.stringify(filterNonNull(page))}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          {currentPage + 2 < pages && <span>...</span>}
          <li
            className={classNames("page-item", {
              active: pages == currentPage,
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
          {currentPage < pages && (
            <li className={classNames("page-item ")}>
              <Link
                className="page-link"
                onClick={() => setSearch({ ...search, page: currentPage + 1 })}
                to={
                  "?" +
                  qs.stringify(
                    filterNonNull({ ...search, page: currentPage + 1 })
                  )
                }
              >
                {">"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CarSearch;
