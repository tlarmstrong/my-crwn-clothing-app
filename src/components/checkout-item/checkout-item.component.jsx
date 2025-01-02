import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={ imageUrl } alt={ `${name}` } />
      </div>
      <div className='name'>{ name }</div>
      <div className='quantity'>
        <span className='arrow' onClick={ removeItemHandler }> &#10094; </span>
        <span className='value'> { quantity } </span>
        <span className='arrow' onClick={ addItemHandler }> &#10095; </span>
      </div>
      <div className='price'>{ price }</div>
      <div className='remove-button' onClick={ clearItemHandler }> &#10005; </div>
    </div>
  )
}

export default CheckoutItem;
