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

    const newsIsShow = news.filter((el) => el.isShow)

  return (
    <>
      <Carousel
        value={newsIsShow}
        numVisible={4}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        header={<h3 className="text-center m-4">Новини та акції</h3>}
      />
    </>
  );
};

export default NewsHomePage;
