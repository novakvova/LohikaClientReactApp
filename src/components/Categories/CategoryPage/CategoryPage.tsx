import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import NoMatch from '../../NoMatch';
import { IGetCategory } from '../types/GetCategoryByID';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const CategoryDetailPage = () => {
  let { id } = useParams() as any;
  const navigator = useNavigate();
  const { categoryData, loading } = useTypedSelector((store) => store.categoryCrud);
  const { getCategoryById, addFlashMessage, deleteFlashMessage } = useActions();
  const { title, urlSlug, image, priority } = categoryData;

  const getCategory = useCallback(async () => {
    try {
      const response: IGetCategory = await getCategoryById(id);
      const { status } = response;
      console.log(status);

      if (status === 204) {
        navigator('/categories');
        await addFlashMessage({
          type: 'error',
          message: ' Категорію не знайдено',
        });
        setTimeout(() => {
          deleteFlashMessage();
        }, 2000);
      }
    } catch (error) {}
  }, [getCategoryById, addFlashMessage, deleteFlashMessage, id, navigator]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (!id) {
    return <NoMatch />;
  }

  return (
    <section>
      <Helmet>
        <title>Інформація про категорію</title>
      </Helmet>
      <Card title="Інформація про категорію">
        <div className="row">
          <div className="col-2">
            <Image src={`https://vovalohika.tk/images/${image}`} alt="avatar"/>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-sm-2">
                <p className="mb-0">Назва категорії</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{title}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <p className="mb-0">ID</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{id}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <p className="mb-0">Пріорітет</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{priority}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2">
                <p className="mb-0">urlSlug</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{urlSlug}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2 p-mt-6'>
        <Link to="/adminPanel/categories">
            <Button label="Назад" icon="pi pi-chevron-circle-left"/>   
          </Link> 
        </div>
    
      </Card>
      {loading && <EclipseWidget />}
    </section>
  );
};

export default CategoryDetailPage;
