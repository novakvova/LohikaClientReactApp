import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IEditorValues } from '../types';
import EclipseWidget from "../../../common/eclipse";
import "./lastNewsList.css";

const LastNewsList = () => {
  const { getNews } = useActions();
  const { news, loading } = useTypedSelector((store) => store.news);
  useEffect(() => {
    getNews();
  }, [getNews]);
  return (
    <>
	{loading && <EclipseWidget />}
		 <Card
              title="Останні новини"
              style={{ width: "100", textAlign: "center" }}
            >
      {news.map((el: IEditorValues) => {
        return (
          <Link to={`/news/${el.slug}`} className="lastNewsList">
            <h6 className="newsItem">{el.name}</h6>
          </Link>
        );
      })}
	  </Card>
    </>
  );
};

export default LastNewsList;