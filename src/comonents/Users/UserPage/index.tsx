import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import EclipseWidget from '../../common/eclipse';
import NoMatch from '../../NoMatch';

const UserDetailPage = () => {
	let { id } = useParams() as any; 
  const { userData, loading } = useTypedSelector(strore => strore.userCrud);
  const { getUserById } = useActions();
  const { firstName, phone, photo, email } = userData;

  useEffect(() => {
    getUserById(id);
  }, []);

  if (!id) {
    return <NoMatch />;
  }

    return (
      <section>
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