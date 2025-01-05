import { Link } from "react-router";

import ProductCard from '../../components/product-card/product-card.component';

import {
  CategoryPreviewContainer,
  Title,
  Preview
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
      <Title to={ title }>
        { title.toUpperCase() }
      </Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={ product }></ProductCard>
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;
