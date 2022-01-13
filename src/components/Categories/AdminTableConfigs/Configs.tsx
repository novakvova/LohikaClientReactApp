import { Button } from 'primereact/button';
import { CategoryInfo } from '../types';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import CategorySearch from '../CategorySearch/CategorySearch';

export const TableImageTemplate = (rowData: CategoryInfo) => {
  return (
    <img
      src={`https://vovalohika.tk${rowData.image}?t=${uuid()}`}
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
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="table-header">Категорії</div>
        <Button
          label="Пошук"
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
