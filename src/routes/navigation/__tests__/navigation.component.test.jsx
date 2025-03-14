import { screen, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { signOutStart } from '../../../store/user/user.action';

vi.mock(import("react-redux"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
  }
})

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

  test('Should dispatch signOutStart action when clicking on the Sign Out link', async () => {
    const mockDispatch = vi.fn();
    vi.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {}
        }
      }
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    await fireEvent.click(signOutLinkElement);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
  });

  test('Should dispatch signInStart action when clicking on the Sign In link', async () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null
        }
      }
    });

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();
  })
});
