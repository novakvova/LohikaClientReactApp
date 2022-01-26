import { useActions } from "../../../../hooks/useActions";
import { Helmet } from "react-helmet";
import FormNews from '../NewsForm';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IEditorValues } from '../types';

const EditNews = () => {
  const { getInfoNews, editNews } = useActions();
  const { newsData } = useTypedSelector( store => store.news)
  const { slug } = useParams();

  useEffect(() => {
    if (slug) getInfoNews(slug);
  }, [getInfoNews, slug]);

  const initValues: IEditorValues = {
    ...newsData,
    image: `https://vovalohika.tk/images/1200_${newsData.image}`,
    //dateTimePublish: new Date(newsData.dateTimePublish.substring( newsData.dateTimePublish.indexOf(" "),0)).toLocaleDateString("uk-UA"),
  };
  
  return (
    <>
      <Helmet>
        <title>Редагувати новину</title>
      </Helmet>
      <FormNews
        initVal={initValues}
        addUpdateHandler={editNews}
        buttonText="Редагувати"
        header="Редагувати новину"
        toaastDetail="Новину відредаговано"
      />
    </>
  );
};


export default EditNews;
