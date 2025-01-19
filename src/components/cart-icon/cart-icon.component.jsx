import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

import {
  CartIconContainer,
  ShoppingBagIcon,
  ItemCount
} from './cart-icon.styles';

const CartIcon = () => {
  const dispath = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispath(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={ toggleIsCartOpen }>
      <ShoppingBagIcon />
      <ItemCount>{ cartCount }</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
