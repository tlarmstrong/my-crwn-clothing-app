import { screen } from '@testing-library/react';

import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test/test.utils';

describe('Navigation tests', () => {
  test('Should render a Sign In and not Sign Out link if no currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        }
      }
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    // queryByText will return null if not found
    const signOutLinkElement = screen.queryByText((/sign out/i));
    expect(signOutLinkElement).toBeNull();
  });

  test('Should render a Sign Out and not Sign In link if there is currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        }
      }
    });

    // queryByText will return null if not found
    const signInLinkElement = screen.queryByText((/sign in/i));
    expect(signInLinkElement).toBeNull();

    // getByText will return an error if not found
    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });

  test('Should not render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: []
        }
      }
    });

    // queryByText will return null if not found
    const cartDropdownElement = screen.queryByText((/cart is empty!/i));
    expect(cartDropdownElement).toBeNull();
  });

  test('Should render a cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: []
        }
      }
    });

    // queryByText will return null if not found
    const cartDropdownElement = screen.getByText((/cart is empty!/i));
    expect(cartDropdownElement).toBeInTheDocument();
  });

});
