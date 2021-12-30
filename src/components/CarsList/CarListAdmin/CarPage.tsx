import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse";
import { v4 as uuid } from "uuid";


const CarPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [img, setImg] = useState<string>("");
  const { id } = useParams();
  const { fetchCarById } = useActions();
  const { carSearchedById } = useTypedSelector((store) => store.car);

  const getCarById = useCallback(async () => {
    try {
      setShowLoader(true);
      const data = await fetchCarById(Number(id));
      console.log(data);
      setShowLoader(false);
      const { image } = data;
      setImg(`https://vovalohika.tk/images/600_${image}?t=${uuid()}`);
    } catch (error) {
      console.log("err = > ", error);
    }
  }, [fetchCarById, id]);

 
  useEffect(() => {
    getCarById();
  }, [getCarById]);

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
              <img
                style={{ width: "100%" }}
                src={img}
                alt="avatar"
                className="rounded img-fluid"
              />
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
            <button type="button" className="btn btn-secondary">
              Повернутись до списку
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarPage;
