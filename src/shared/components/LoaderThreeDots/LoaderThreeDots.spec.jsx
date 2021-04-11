import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import LoaderThreeDots from './LoaderThreeDots';

describe('Render <LoaderThreeDots />', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render <LoaderThreeDots />', async () => {
    await act(async () => {
      render(<LoaderThreeDots />);
    });

    expect(screen.getByTestId('loaderThreeDots')).toBeInTheDocument();
  });
});
