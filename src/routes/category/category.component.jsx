import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryTitle, CategoryContainer } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  // only want to update if the category or category map changes
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{ category.toUpperCase() }</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={ product.id } product={ product } />
          ))}
      </CategoryContainer>
    </Fragment>
  );
}

export default Category;
