import { Fragment, useContext } from 'react';
import { Outlet, Link } from "react-router";

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { 
  NavigationContainer, 
  LogoContainer, 
  NavLinksContainer,
  NavLink
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          { currentUser ? (
              <NavLink as='span' onClick={ signOutUser }>Sign Out</NavLink>
            ) : (
              <NavLink to='/auth'>Sign In</NavLink>
            )
          }
          <CartIcon />
        </NavLinksContainer>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
