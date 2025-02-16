import { FC, memo } from 'react';

import {
  CartItemContainer,
  ItemDetails,
  Name
} from './cart-item.styles';

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem;
}

// memo = prevent unneeded rerenders, unless the cart item changes
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={ imageUrl } alt={ `${name}` } />
      <ItemDetails>
        <Name>{ name }</Name>
        <span>{ quantity } x { price }</span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
