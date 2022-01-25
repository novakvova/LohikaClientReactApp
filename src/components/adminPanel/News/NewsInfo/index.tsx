import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import parse from "html-react-parser";
import LastNewsList from '../NewsList';
import EclipseWidget from '../../../common/eclipse';
import { Helmet } from 'react-helmet';

import "./newsInfo.css";

const NewsInfo = () => {
	let { slug } = useParams();
	const {getInfoNews} = useActions();
	const { newsData:{ text, name, dateTimePublish, image }, loading } = useTypedSelector(store => store.news)
	
	useEffect(() => {
    if (slug) getInfoNews(slug);
  }, [getInfoNews, slug]);

const content = (text: string) => {
  return <>{parse(text)}</>;
};

const publishDate = new Date(dateTimePublish).toLocaleDateString("uk-UA", {day: "2-digit", month:"long", year:"numeric"})

const title = (
  <>
    <h3>{name}</h3>
  </>
);
const backroundImage = `https://vovalohika.tk/images/1200_${image}`;
	return (
    <>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      {loading && <EclipseWidget />}
      <Card style={{ width: "100%", padding: "1em", margin: "1em" }}>
        <div className="row newsInfo container-flud">
          <div className="col-lg-8 col-md-12">
            <h2
              className="titleNews"
              style={{
                background: `url(${backroundImage}) no-repeat center`,
                backgroundSize: "100%",
              }}
            >
              {title}
            </h2>
            <span className="publishDate">Дата публікації: {publishDate}</span>
            {content(text)}
          </div>
          <div className="col-lg-4 d-block col-md-none">
            <LastNewsList />
          </div>
        </div>
      </Card>
    </>
  );
}

export default NewsInfo;