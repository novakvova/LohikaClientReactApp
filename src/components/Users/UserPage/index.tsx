import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import NoMatch from '../../NoMatch';
import { IGetUser } from '../types/GetUserById';

const UserDetailPage = () => {
	let { id } = useParams() as any; 
  const navigator = useNavigate();
  const { userData, loading } = useTypedSelector(strore => strore.userCrud);
  const { getUserById, addFlashMessage, deleteFlashMessage } = useActions();
  const { firstName, phone, photo, email, secondName } = userData;

   const getUser = async () => {
    try {
      const response: IGetUser = await getUserById(id);
      const { status } = response;
      console.log(status);

      if (status === 204) {
        navigator("/users");
        await addFlashMessage({
          type: "error",
          message: "Даного користувача не знайдено",
        });
        setTimeout(() => {
          deleteFlashMessage();
        }, 2000);
      }
    } catch (error) {}
      }

  useEffect( () => {
    getUser();
   
  }, []);

  if (!id) {
    return <NoMatch />;
  }

    return (
      <section>
        <Helmet>
          <title>Інформація про користувача</title>
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
                      src={`https://vovalohika.tk${photo}`}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                    />
                    <h5 className="my-3">{firstName}</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Ім'я</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{firstName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Прізвище</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{secondName}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Телефон</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{phone}</p>
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

export default UserDetailPage;