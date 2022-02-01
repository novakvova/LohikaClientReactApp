import { Button } from 'primereact/button';
import { CategoryInfo } from '../types';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import CategorySearch from '../CategorySearch/CategorySearch';
import {  useNavigate } from 'react-router-dom';

export const TableImageTemplate = (rowData: CategoryInfo) => {
  const imagesrc = `https://vovalohika.tk/images/150_${rowData.image}?t=${uuid()}`;
  console.log(imagesrc);
  return (
    <img
      src={imagesrc}
      height="70"
      onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
        ((event.target as HTMLImageElement).src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
      alt="CategoryImage"
      className="product-image"
      style={{ width: 'auto' }}
    />
  );
};

export const AdminSearch = () => {
  const [toggleSearch, setToggleSearch] = useState(false);

  const navigator = useNavigate();

  const handelAdd = () => {
    navigator(`/adminPanel/categories/add`);
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="table-header">Категорії</div>
        <Button 
        className='p-button-raised p-button-secondary'
        label="Додати категорію"
        icon="pi pi-plus" 
        onClick={() => handelAdd()} />

        <Button
        className='p-button-raised p-button-secondary'
          label="Шукати категорію"
          icon="pi pi-search"
          onClick={() => {
            setToggleSearch((prev) => !prev);
          }}
        />
      </div>

      {toggleSearch && <CategorySearch />}
    </>
  );
};
