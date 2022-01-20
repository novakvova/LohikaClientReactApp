import { Card } from "primereact/card";
import { IEditorValues } from "../types";

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
        />
      );
  return (
    <Card
      //title={news.name}
      subTitle={news.name}
      style={{ height: "15em", margin: "1rem" }}
      header={header}
    ></Card>
  );
};
