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

  let categName:string = '';
  if(products.length === 0){
    setTimeout(()=> (categName = ' не знайдено'), 100)
  } else {
    categName = products[0].categoryName
  }

  return (
  <>
  <h2>Товари за категорією {categName}</h2>
  <div>
  <span><Link to={'/'}>На головну / </Link></span>
<span><Link to={'/category/:urlSlug'}>{categName}</Link></span> 
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
