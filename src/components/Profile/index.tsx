import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EclipseWidget from '../common/eclipse';

import './index.css'

const ProfilePage = () => {
  const { GetProfileData } = useActions();
  const { profile : {email, phone, photo, firstName, secondName}, loading } = useTypedSelector( store => store.profile);
useEffect(() => {
  GetProfileData();
}, [GetProfileData]);

  return (
    <section>
      <Helmet>
        <title>Профіль</title>
      </Helmet>
      <div className="container py-5 ">
        <h2 className="text-center pb-5">Мій профіль</h2>
        {loading && <EclipseWidget />}
        {!loading && (
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={
                      !photo.endsWith("image/")
                        ? `https://vovalohika.tk${photo}`
                        : "https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png"
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid"
                  />
                  <h5 className="my-3">
                    <span>{firstName}</span>
                    <span> {secondName}</span>
                  </h5>
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

export default ProfilePage;
