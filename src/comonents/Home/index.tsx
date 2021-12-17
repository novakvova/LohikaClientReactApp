import CarsList from "../CarsList";
import CarSearch from "../CarsList/CarSearch/CarSearch";

const HomePage = () => {
  return (
    <>
      <h1 className="text-center">Список автомобілів</h1>
      <CarSearch>
        <CarsList />
      </CarSearch>
    </>
  );
};
export default HomePage;
