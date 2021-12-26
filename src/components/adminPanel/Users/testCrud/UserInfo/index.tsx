import { useParams } from 'react-router-dom';
import { Card } from "primereact/card"
import { Image } from "primereact/image"
import { useActions } from '../../../../../hooks/useActions';
import { useEffect } from 'react';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Helmet } from 'react-helmet';
import EclipseWidget from '../../../../common/eclipse';
import NoMatch from '../../../../NoMatch';

const UserInfo = () => {
	const { id } = useParams();
	const _id = Number(id);
	const { getUserById } = useActions();
	const { userData, loading } = useTypedSelector( store => store.userCrud);
	const { firstName, phone, photo, email, secondName } = userData;

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
      <Card title="Інформація про користувача">
        <div className="row">
          <div className="col-2">
            <Image src={`https://vovalohika.tk${photo}`} alt="Image Text" />
          </div>
          <div className="col">
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
      </Card>
      {loading && <EclipseWidget />}
    </>
  );
}

export default UserInfo;