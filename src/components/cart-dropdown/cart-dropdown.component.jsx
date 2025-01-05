import { useContext } from 'react';
import { useNavigate } from "react-router";

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage
} from'./cart-dropdown.styles';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  {
    if(cartItems.length > 0 ) {
      return (
        <CartDropdownContainer>
          <CartItems>
            { cartItems.map(item => <CartItem key={ item.id } cartItem={ item } />) }
          </CartItems>
          <Button onClick={ goToCheckoutHandler }>Checkout</Button>
        </CartDropdownContainer>
      )
    }
    return (
      <CartDropdownContainer>
        <EmptyMessage>Cart is Empty!</EmptyMessage>
      </CartDropdownContainer>
    );
  }
}

export default CartDropdown;
