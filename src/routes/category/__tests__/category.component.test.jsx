import { screen } from '@testing-library/react';
import * as dom from 'react-router';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({
      category: 'mens',
    })
  }
})

describe('Category tests', () => {
  test('Should render a spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: []
        }
      }
    });
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('Should a category if isLoading is false', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              items: [
                {id: 1, name: 'product 1'},
                {id: 2, name: 'product 2'}
              ]
            }
          ]
        }
      }
    });
    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();

    const categoryElement = screen.getByText(/mens/i);
    expect(categoryElement).toBeInTheDocument();

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
});
