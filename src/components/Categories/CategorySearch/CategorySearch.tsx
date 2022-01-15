import { Form, FormikProvider, useFormik } from 'formik';
import InputGroup from '../../common/InputGroup';
import { ISearchCategory } from '../types/SearchCategories';
import { useActions } from '../../../hooks/useActions';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const CategorySearch = () => {
  const { getSearchCategoryResult } = useActions();
  const { pages, loading } = useTypedSelector((store) => store.userCrud);
  const [searchParams, setSearchParams] = useSearchParams();

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
    formik.resetForm();
    console.log('reset');

  };

  const formik = useFormik({
    initialValues: search,
    onSubmit: onHandleSubmit,
  });

  const { handleChange, handleSubmit, values } = formik;

  return (
    <div className="team_dark">
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
                  <InputGroup 
                  field="id" 
                  label="id" 
                  onChange={handleChange} 
                  value={values?.id} />
                </div>
                <div className="mt-auto p-3 align-self-end">
                  <Button type="submit" label="Пошук" icon="pi pi-search" />
                </div>
              </div>
            </Form>
          </FormikProvider>
        </Card>
      {loading && <EclipseWidget />}
    </div>
  );
};

export default CategorySearch;
