import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  );
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
  case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    return {
      ...state,
      isCartOpen: payload
    }
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      ...payload
    }
  default:
    throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = 
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (bool) => {
    return dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + (cartItem.price * cartItem.quantity), 0
    );
    return dispatch(
      createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS,
        { 
          cartItems: newCartItems, 
          cartCount: newCartCount, 
          cartTotal: newCartTotal 
        }
      )
    );
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItems(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItems(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItems(newCartItems);
  }

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart, 
    cartItems, 
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
  );
}
