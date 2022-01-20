import { Helmet } from "react-helmet";
import NewsHomePage from '../adminPanel/News/NewsOnHomePage';
import CarsList from "../CarsList";
import CarSearch from "../CarsList/CarSearch/CarSearch";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Головна</title>
      </Helmet>
      <NewsHomePage />
      <h1 className="text-center">Список автомобілів</h1>
      <CarSearch>
        <CarsList />
      </CarSearch>
    </>
  );
};
export default HomePage;
