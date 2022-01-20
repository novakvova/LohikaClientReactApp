import { Helmet } from "react-helmet";
import CarsList from "../CarsList";
import CarSearch from "../CarsList/CarSearch/CarSearch";
import CategoriesListHomePage from "../Categories/CategoriesHomePage/CategoriesListHomePage";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Головна</title>
      </Helmet>
      <CategoriesListHomePage/>
      <h1 className="text-center">Список автомобілів</h1>
      <CarSearch>
        <CarsList />
      </CarSearch>
    </>
  );
};
export default HomePage;
