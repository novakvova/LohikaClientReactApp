import classNames from 'classnames';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ISearchUser } from '../types/SearchUsers';

const Paginator = () => {
	const { getSearchResult } = useActions(); 
	const { pages,  total, currentPage } = useTypedSelector( (store) => store.userCrud);
	const [searchParams, setSearchParams] = useSearchParams();
  
  const [search, setSearch] = useState<ISearchUser>({
    id: searchParams.get("id") || "",
    firstName: searchParams.get("firstName") || "",
    secondName: searchParams.get("secondName") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
    page: searchParams.get("page") || "",
  });

  useEffect(() => {
    getSearchResult(filterNonNull(search));
  }, [getSearchResult, search]);


  const filterNonNull = (obj: ISearchUser): ISearchUser => {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
  };

  const buttons = [];
  for (var i = 2; i < pages; i++) {
    buttons.push(i);
  };

  const newPage = (page: number) => {
    let data: ISearchUser = {
      id: searchParams.get("id") || "",
      firstName: searchParams.get("firstName") || "",
      secondName: searchParams.get("secondName") || "",
      phone: searchParams.get("phone") || "",
      email: searchParams.get("email") || "",
      page,
    }; 

  setSearch(data);
  setSearchParams(qs.stringify(filterNonNull(data)));
	getSearchResult({...data});
  }

	return (
    <>
      <div className="container">
        <h5>Всього: {total}</h5>
        {pages > 1 && (
          <ul
            className="pagination d-flex justify-content-center"
          >
            <li
              onClick={() => currentPage !== 1 && newPage(currentPage - 1)}
              className={classNames("page-item m-1", {
                disabled: currentPage === 1,
              })}
            >
              <Link
                className="page-link"
                to={ "?" +qs.stringify(filterNonNull({ ...search, page: currentPage - 1 }))}
              >
                &laquo;
              </Link>
            </li>
            <li
              className={classNames("page-item m-1", {
                active: currentPage === 1,
              })}
              onClick={() => currentPage > 1 && newPage(1)}
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
                onClick={() => newPage(currentPage - 3)}
              >
                <Link
                  className="page-link"
                  to={"?" + qs.stringify(filterNonNull({ ...search, page: currentPage - 3 }))}
                >
                  ...
                </Link>
              </li>
            )}
            {buttons
              .filter((el) => el > currentPage - 3 && el < currentPage + 3)
              .map((item, key) => {
                 return (
                  <li
                    key={key}
                    onClick={() => newPage(item)}
                    className={classNames("page-item m-1", {
                      active: item === currentPage,
                    })}
                  >
                    <Link
                      className="page-link"
                      to={
                        "?" +
                        qs.stringify(filterNonNull({ ...search, page: item }))
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
                onClick={() => newPage(currentPage + 3)}
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
                onClick={() => newPage(pages)}
              >
                <Link
                  className="page-link"
                  to={
                    "?" +
                    qs.stringify(filterNonNull({ ...search, page: pages }))
                  }
                >
                  {pages}
                </Link>
              </li>
            )}
            <li
              onClick={() => currentPage < pages && newPage(currentPage + 1)}
              className={classNames("page-item m-1", {
                disabled: currentPage === pages,
              })}
            >
              <Link
                className="page-link"
                to={
                  "?" +
                  qs.stringify(
                    filterNonNull({ ...search, page: currentPage + 1 })
                  )
                }
              >
                &raquo;
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Paginator;