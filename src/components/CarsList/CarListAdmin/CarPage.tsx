import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse";

const CarPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const { id } = useParams();
  const { fetchCarById } = useActions();
  const { carSearchedById } = useTypedSelector((store) => store.car);

  const getCarById = async () => {
    try {
      setShowLoader(true);
      await fetchCarById(Number(id));
      setShowLoader(false);
    } catch (error) {
      console.log("err = > ", error);
    }
  };
  useEffect(() => {
    getCarById();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{carSearchedById?.name}</title>
      </Helmet>
      {showLoader && <EclipseWidget />}
      {!showLoader && (
        <div className="row mt-4">
          <h1>{carSearchedById?.name}</h1>
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={`https://vovalohika.tk${carSearchedById?.image}`}
                  alt="avatar"
                  className="rounded img-fluid"
                />
                <h5 className="my-3">{carSearchedById?.name}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Назва</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{carSearchedById?.name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Приорітет</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {carSearchedById?.priority}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Ціна</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{carSearchedById?.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          <Link to="/cars/">
          <button type="button" className="btn btn-secondary">Повернутись до списку</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarPage;
