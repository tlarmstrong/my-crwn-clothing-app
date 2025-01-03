import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  // only want to update if the category or map changes
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{ category.toUpperCase() }</h2>
      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={ product.id } product={ product } />
          ))}
      </div>
    </Fragment>
  );
}

export default Category;
