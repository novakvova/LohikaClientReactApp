import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CarCard from '../../CarsList/CarCard';

const CarsListBySlug = () => {
  const { urlSlug } = useParams();

  const { getProductsByCategorySlug } = useActions();
  const _urlSlug = String(urlSlug);

  useEffect(() => {
    return getProductsByCategorySlug(_urlSlug);
  }, [getProductsByCategorySlug, _urlSlug]);

  const cps = useTypedSelector((store) => store.productsReducer);
  const { products } = cps.ppl;

  return (
  <>
  <h2>Товари за категорією {cps.ppl.categoryName}</h2>
  <h3> Знайдено: {cps.ppl.total === 1 ? `${cps.ppl.total} товар` : `${cps.ppl.total} товари`} </h3>
  <div>
  <span><Link to={'/'}>На головну / </Link></span>
<span><Link to={'/category/:urlSlug'}>{cps.ppl.categoryName}</Link></span> 
  </div>
    <div className="row d-flex justify-content-around flex-wrap">
      {products.map(({ id, name, price, images, categoryName }) => (
        <CarCard
          id={id}
          key={id}
          name={name}
          price={price}
          images={images}
          categoryName={categoryName}
          image={''}
        />
      ))}
    </div>
  </>
  );
};

export default CarsListBySlug;
