import { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from "../../hooks/useTypedSelector";

import './index.css'

const ProfilePage = () => {
  const { GetProfileData } = useActions();

useEffect(() => {
  GetProfileData();
}, [])

  return (
    <section>
       <div className="container py-5 mt-3 ">
         <h2 className="text-center pb-5">Мій профіль</h2>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png" alt="avatar" className="rounded-circle img-fluid" />
                <h5 className="my-3">John Smith</h5>
              </div>
            </div>
            
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
