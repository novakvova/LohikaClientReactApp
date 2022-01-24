import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CategoryItemHomePage from '../CategoriesHomePage/CategoryItemHomePage';
import { CategoryInfo } from '../types';

const CategoriesListHomePage = () =>{
    
    const { categories } = useTypedSelector( store => store.categoryCrud)
    const { getSearchCategoryResult} = useActions();
    
    useEffect(() => {
      getSearchCategoryResult({});
    }, [getSearchCategoryResult]);
  
      return (
        <div className="container d-flex justify-content-around mb-5">
            {categories.map((categoryItem: CategoryInfo, idx) => (
                <CategoryItemHomePage key={idx} categoryItem={categoryItem} />
            ))}
            
          
      </div>
    );
}

export default CategoriesListHomePage;