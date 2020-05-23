import React from 'react';
import { render } from '@testing-library/react';
import MiniDrawer from "../../components/MiniDrawer/MiniDrawer";

test('renders mini drawer on side', () => {
  const { getByText } = render(<MiniDrawer />);
  const drawer = getByText(/VolaChat/i);
  expect(drawer).toBeInTheDocument();
});