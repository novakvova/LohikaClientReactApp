import { useParams } from 'react-router-dom';
import { Card } from "primereact/card"
import { useActions } from '../../../../hooks/useActions';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Helmet } from 'react-helmet';
import EclipseWidget from '../../../common/eclipse';
import NoMatch from '../../../NoMatch';

const UserInfo = () => {
	const { id } = useParams();
	const _id = Number(id);
	const { getUserById } = useActions();
	const { userData, loading } = useTypedSelector( store => store.userCrud);
	const { firstName, phone, photo, email, secondName } = userData;
  const title = <h3 className="text-center">Інформація про користувача</h3>;
	useEffect(() => {
    getUserById(_id);
  }, [getUserById, _id]);

	  if (!id) {
      return <NoMatch />;
    }
	return (
    <>
      <Helmet>
        <title>Інформація про користувача</title>
      </Helmet>
      <Card title={title}>
        <div className="container">
          {loading && <EclipseWidget />}
          {!loading && (
            <div className="row">
              <div className="col-lg-3">
                <div
                  className="card text-white mb-4"
                  style={{ backgroundColor: "#20262e" }}
                >
                  <div className="card-body text-center">
                    <img
                      src={
                        !photo.endsWith("image/300_")
                          ? `https://vovalohika.tk/images/300_${photo}`
                          : "https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png"
                      }
                      alt="avatar"
                      className="img-fluid"
                    />
                    <h5 className="my-3">
                      <span>{firstName}</span>
                      <span> {secondName}</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div
                  className="card text-white mb-4"
                  style={{ backgroundColor: "#20262e" }}
                >
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
      </Card>
      {loading && <EclipseWidget />}
    </>
  );
}

export default UserInfo;