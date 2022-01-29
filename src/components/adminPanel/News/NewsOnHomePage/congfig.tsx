import { Card } from "primereact/card";
import { Link } from 'react-router-dom';
import { IEditorValues } from "../types";
import "./newsCard.css"


export const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "600px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "480px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const productTemplate = (news: IEditorValues) => {
      const header = (
        <img
          alt={news.name}
          src={`https://vovalohika.tk/images/600_${news.image}`}
          srcSet={`https://vovalohika.tk/images/150_${news.image} 480px,
                   https://vovalohika.tk/images/300_${news.image} 600px,
                   https://vovalohika.tk/images/600_${news.image} 1024px`}
          sizes="(max-width: 480px) 440px,
                  (max-width: 600px) 560px,
                  600px"
        />
      );
      const sub = (<h6 className='text-center'>{news.name}</h6>)
  return (
    <>
      <Link to={`/news/${news.slug}`} style={{ textDecoration: "none" }}>
        <Card
          className="card_setting"
          subTitle={sub}
          style={{ height: "15em", margin: "1rem", background: "#6c757d" }}
          header={header}
        ></Card>
      </Link>
    </>
  );
};
