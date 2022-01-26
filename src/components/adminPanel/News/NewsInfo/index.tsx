import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import parse from "html-react-parser";
import EclipseWidget from '../../../common/eclipse';
import { Helmet } from 'react-helmet';

import "./newsInfo.css";
import { Card } from 'primereact/card';

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
        <div className="newsInfo">
          <h2
            className="titleNews"
            style={{ background: `url(${backroundImage}) no-repeat center` }}
          >
            {title}
          </h2>
          <span className="publishDate">
            Дата публікації: {dateTimePublish}
          </span>
          {content(text)}
        </div>
      </Card>
    </>
  );
}

export default NewsInfo;