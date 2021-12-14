import { FormikHelpers, useFormik } from "formik";
import { Link, useSearchParams } from "react-router-dom";
import classNames from "classnames";

import { useActions } from "../../../hooks/useActions";
import { ISearchProduct, IClickedButtonData } from "../types";
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
  const { pages, currentPage } = useTypedSelector((store) => store.car);

  const buttons = [];
  for (var i = 1; i <= pages; i++) {
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
    console.log("Search data", searchData);
    setSearch(searchData);
  };
  const formik = useFormik({
    initialValues: search,
    onSubmit,
  });

  return (
    <div>
      <form
        className="w-100 d-flex flex-column "
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3 w-25 mx-auto ">
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
        <div className="mb-3 w-25 mx-auto ">
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
        <div className="mb-3 w-25 mx-auto ">
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
        <div className="mb-3 w-25 mx-auto ">
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
        <button type="submit" className="btn mx-auto w-25 btn-secondary">
          <span>
            <i className="fa fa-search"></i>
          </span>
          <span>Search</span>
        </button>
      </form>
      <ul className="pagination">
        {buttons.map((item, key) => {
          const page: ISearchProduct = {
            ...search,
            page: item,
          };
          return (
            <li
              key={key}
              onClick={() => setSearch(page)}
              className={classNames("page-item", {
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
      </ul>
    </div>
  );
};

export default CarSearch;
