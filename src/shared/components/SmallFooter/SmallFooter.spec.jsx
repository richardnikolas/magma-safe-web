import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import SmallFooter from './SmallFooter';

describe('Render <SmallFooter />', () => {
  it('should render <SmallFooter />', async () => {
    await act(async () => {
      render(<SmallFooter />);
    });

    expect(
      screen.getByText('MagmaSafe', { exact: false })
    ).toBeInTheDocument();
  });
});
