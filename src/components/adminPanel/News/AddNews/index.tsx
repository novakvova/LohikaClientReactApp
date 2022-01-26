import { useActions } from "../../../../hooks/useActions";
import { Helmet } from "react-helmet";
import FormNews from '../NewsForm';

const AddNews = () => {
  const { addNews } = useActions();

  const initValues = {
  name: "",
  text: "",
  image: "",
  slug: "",
  isShow: false,
  dateTimePublish: ""
  }

  return (
    <>
      <Helmet>
        <title>Добавити новини</title>
      </Helmet>
      <FormNews
        initVal={initValues}
        addUpdateHandler={addNews}
        buttonText="Додати"
        header="Додати новину"
        toaastDetail="Новину додано"
      />
    </>
  );
};

export default AddNews;
