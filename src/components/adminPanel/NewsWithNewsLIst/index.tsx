import { Card } from 'primereact/card';
import NewsInfo from '../News/NewsInfo';
import LastNewsList from '../News/NewsList';

const NewsWithNewsList = () => {
	return (
    <>
      <Card style={{ width: "100%", padding: "1em", margin: "1em" }}>
        <div className="row newsInfo ">
          <div className="col-lg-8 col-md-12">
			  <NewsInfo />
          </div>
          <div className="col-lg-4 d-block col-md-none">
            <LastNewsList />
          </div>
        </div>
      </Card>
    </>
  );
};

export default NewsWithNewsList;