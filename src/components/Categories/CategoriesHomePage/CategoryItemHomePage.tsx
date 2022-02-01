import { v4 as uuid } from 'uuid';
import { CategoryInfo } from '../types';
import { Card } from 'primereact/card';
import './style.css'
import { useNavigate } from 'react-router-dom';

interface Props {
  categoryItem: CategoryInfo;
}

const CategoryItemHomePage: React.FC<Props> = ({ categoryItem: { urlSlug, title, image }}) => {

  const navigator = useNavigate();

  const onClick = () =>{
    navigator(`/category/${urlSlug}/`)
  }
  
  const header = (
    <img 
    height="150"
    width='200'
    alt={title} 
    src={`https://vovalohika.tk/images/300_${image}?t=${uuid()}`} 
    onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
      ((event.target as HTMLImageElement).src =
        "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
    } />
);

  return (
    <div onClick={onClick}>
      <Card 
      className='element'
        title={title}
        style={{ 
          width: '17em', 
          background: "fixed",
          color: "#2a323d" }}
        header={header}>
      </Card>
    </div>
  );
};

export default CategoryItemHomePage;
