import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders codeTranslate text', () => {
  const { getByText } = render(<App />);
  const appBarElement = getByText(/CodeTranslate/i);
  expect(appBarElement).toBeInTheDocument();
});

test('renders input code label ', () => {
  const { getByText } = render(<App />);
  const codeLabel = getByText(/Input Code/i);

  expect(codeLabel).toBeInTheDocument();
  
});
