import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
// import { store } from '../../../store';
import EclipseWidget from '../../common/eclipse';
import NoMatch from '../../NoMatch';
import { IGetCategory } from '../types/GetCategoryByID';


const CategoryDetailPage = () => {
	let { id } = useParams() as any; 
  const navigator = useNavigate();
  const { categoryData, loading } = useTypedSelector(store => store.categoryCrud);
  const { getCategoryById, addFlashMessage, deleteFlashMessage } = useActions();
  const { title, urlSlug, image, priority } = categoryData;

   const getCategory = async () => {
    try {
      const response: IGetCategory = await getCategoryById(id);
      const { status } = response;
      console.log(status);

      if (status === 204) {
        navigator("/categories");
        await addFlashMessage({
          type: "error",
          message: " Категорію не знайдено",
        });
        setTimeout(() => {
          deleteFlashMessage();
        }, 2000);
      }
    } catch (error) {}
      }

  useEffect( () => {
    getCategory();
   
  }, []);


  if (!id) {
    return <NoMatch />;

  }

    return (
      <section>
        <Helmet>
          <title>Інформація про категорію</title>
        </Helmet>
        <div className="container py-5 mt-3 ">
          <h2 className="text-center pb-5">Інформація</h2>
          {loading && <EclipseWidget />}
          {!loading && (
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src={`https://vovalohika.tk${image}`}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                    />
                    <h5 className="my-3">{title}</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Назва категорії</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{title}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">ID</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Пріорітет</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{priority}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">urlSlug</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{urlSlug}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
};

export default CategoryDetailPage;