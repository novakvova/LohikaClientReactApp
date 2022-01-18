import classNames from 'classnames';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ISearchCategory } from '../types/SearchCategories';

const Pagination = () => {
  const { getSearchCategoryResult } = useActions();
  const { pages, currentPage, total } = useTypedSelector((store) => store.categoryCrud);
  const [searchParams] = useSearchParams();

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

  return (
    <>
      <h5>Всього категорій: {total}</h5>
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
    </>
  );
};

export default Pagination;
