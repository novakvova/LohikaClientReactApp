import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IEditorValues } from '../types';
import EclipseWidget from "../../../common/eclipse";
import "./lastNewsList.css";

const LastNewsList = () => {
  const { getSearchNews } = useActions();
  const { searchNews: {products}, loading } = useTypedSelector((store) => store.news);

  useEffect(() => {
    getSearchNews({pageSize: 3, Page:1});
  }, [getSearchNews]);

 
  return (
    <>
      {loading && <EclipseWidget />}
      <Card
        title="Останні новини"
        style={{ textAlign: "center", padding: "0.5rem" }}
      >
        {products.map((el: IEditorValues) => {
          return (
            <Link to={`/news/${el.slug}`} className="lastNewsList">
              <div className="newsItem">
                <h6 className="publishDateRight">{el.dateTimePublish}</h6>

                <div className="row container-fluid">
                  <div className="col-xl-8 col-sm-12">
                    <h6>{el.name}</h6>
                  </div>
                  <div className="col-4">
                    <img
                      style={{ maxWidth: "100%" }}
                      src={`https://vovalohika.tk/images/100_${el.image}`}
                      alt={el.image}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {products.length < 4 && (
          <h6
            className="displayMoreNews"
            onClick={() => getSearchNews({ pageSize: 10, Page: 1 })}
          >
            Показати ще
          </h6>
        )}
      </Card>
    </>
  );
};

export default LastNewsList;