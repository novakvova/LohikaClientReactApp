import { Carousel } from "primereact/carousel";
import { useEffect } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { productTemplate, responsiveOptions } from './congfig';

const NewsHomePage = () => {
  const { getNews } = useActions();
  const { news } = useTypedSelector( store => store.news)
  useEffect(() => {
    getNews();
  }, [getNews]);


  return (
    <>
        <Carousel
          value={news}
          numVisible={4}
          numScroll={4}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
          header={<h3 className='text-center'>Новини та акції</h3>}
        />
    </>
  );
};

export default NewsHomePage;
