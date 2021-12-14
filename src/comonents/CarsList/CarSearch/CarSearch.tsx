import { FormikHelpers, useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useActions } from "../../../hooks/useActions";
import { ISearchProduct, IClickedButtonData } from "../types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { useEffect, useState } from "react";

const CarSearch = () => {
  const { fetchCarsSearch } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const { carsSearchList } = useTypedSelector((store) => store.car);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || "1"
  );

  const initialValues: ISearchProduct = {
    id: searchParams.get("id") || "",
    name: searchParams.get("name") || "",
    price: searchParams.get("price") || "",
    priority: searchParams.get("priority") || "",
    page: searchParams.get("page") || "1",
  };

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries({
        id: searchParams.get("id") || "",
        name: searchParams.get("name") || "",
        price: searchParams.get("price") || "",
        priority: searchParams.get("priority") || "",
        page: searchParams.get("page") as string,
      }).filter((item) => item[1] !== "")
    );
    console.log(params);
    fetchCarsSearch(params);
    setSearchParams(params);
  }, [currentPage]);

  const onSubmit = (
    values: ISearchProduct,
    helpers: FormikHelpers<ISearchProduct>
  ) => {
    const params = Object.fromEntries(
      Object.entries({ ...values, page: `1` }).filter((item) => item[1] !== "")
    );
    setSearchParams(params);
    fetchCarsSearch(params);
  };

  const handlePageClick = (data: IClickedButtonData) => {
    setCurrentPage(`${data.selected + 1}`);
    searchParams.set("page", `${data.selected + 1}`);
  };

  const formik = useFormik({
    initialValues,
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
            value={formik.values.id as string}
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
      <ReactPaginate
        pageCount={carsSearchList.pages}
        initialPage={+currentPage - 1}
        breakLabel="..."
        nextLabel="Наступна >"
        previousLabel="< Попередня"
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default CarSearch;
