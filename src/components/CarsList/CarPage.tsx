import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions"; 
import { useTypedSelector } from "../../hooks/useTypedSelector"; 
import EclipseWidget from "../common/eclipse";
import { v4 as uuid } from "uuid";
import parse from "html-react-parser";

const CarPage = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [img, setImg] = useState<Array<string>>([]);
  const { id } = useParams();
  const { fetchCarById } = useActions();
  const { carSearchedById } = useTypedSelector((store) => store.car);
  const getCarById = useCallback(async () => {
    try {
      setShowLoader(true);
      const data = await fetchCarById(Number(id));
      setShowLoader(false);
      const { images } = data;
      setImg(images.map((item: { name: string }) => item.name));
    } catch (error) {
      console.log("err = > ", error);
    }
  }, [fetchCarById, id]);

  useEffect(() => {
    getCarById();
  }, [getCarById]);

  const desciptionParsed = (text: string) => {
    return <>{parse(text)}</>;
  };

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
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {img.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={idx}
                      className={idx === 0 ? "active" : ""}
                      aria-current={idx === 0 ? "true" : "false"}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  );
                })}
              </div>
              <div className="carousel-inner">
                {img.map((item, idx) => {
                  return (
                    <div
                      key={item}
                      className={
                        idx === 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <img
                        style={{
                          width: "100%",
                          overflow: "hidden",
                        }}
                        src={`https://vovalohika.tk/images/600_${item}?t=${uuid()}`}
                        alt="avatar"
                        className="d-block w-100 h-100 rounded img-fluid"
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
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
                    <p className="text-muted mb-0">{`${carSearchedById?.price} $`}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                  {carSearchedById.description && desciptionParsed(carSearchedById.description)}
                  
                </div>
                <div className="col-3"></div>
              </div>
            </div>
          </div>

          <Link to="/">
            <button type="button" className="btn btn-secondary">
              На головну
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarPage;
