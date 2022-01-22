import { Card } from 'primereact/card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import ReactHtmlParser from "react-html-parser";
import LastNewsList from '../NewsList';
import EclipseWidget from '../../../common/eclipse';

const NewsInfo = () => {
	let { slug } = useParams();
	const {getInfoNews} = useActions();
	const { newsData:{ text, name, dateTimePublish }, loading } = useTypedSelector(store => store.news)
	
	useEffect(() => {
    if (slug) getInfoNews(slug);
  }, [getInfoNews, slug]);

const content = (text: string) => {
  return <>{ReactHtmlParser(text)}</>;
};

const publishDate = new Date(dateTimePublish).toLocaleDateString("uk-UA", {day: "2-digit", month:"long", year:"numeric"})

const title = (
  <>
    <h3>{name}</h3>
    <span style={{fontSize: "14px"}}>{publishDate}</span>
  </>
);

	return (
    <>
	{loading && <EclipseWidget />}
      <div className="row">
        <div className="col-8">
          <Card
            title={title}
            style={{ width: "100", padding: "1em", marginBottom: "2em" }}
          >
            {content(text)}
          </Card>
        </div>
        <div className="col-4">
			<LastNewsList />
		</div>
      </div>
    </>
  );
}

export default NewsInfo;