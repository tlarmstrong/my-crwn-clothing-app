import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button />);

    const buttonElement = screen.getByRole('button');
    // https://github.com/testing-library/jest-dom/issues/594
    // currently, this tests the hover state, not the base state
    expect(buttonElement).toHaveStyle('background-color: #ffffff');
  });

  test('should render google button when passed google button type', () => {
    render(<Button buttonType={ BUTTON_TYPE_CLASSES.google } />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('background-color: #357ae8');
  });

  test('should render inverted button passed inverted button type', () => {
    render(<Button buttonType={ BUTTON_TYPE_CLASSES.inverted } />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle({backgroundColor: '#000000'});
  });

  test('should be disabled if isLoading is true', () => {
    render(<Button isLoading={ true } />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
