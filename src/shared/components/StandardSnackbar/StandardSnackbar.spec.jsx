import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import StandardSnackbar from './StandardSnackbar';

describe('Render <StandardSnackbar />', () => {
  it('should render <StandardSnackbar />', async () => {
    await act(async () => {
      render(
        <StandardSnackbar 
          open 
          handleClose={jest.fn}
          variant="outlined" 
          severity="error"
          message="Error and Outlined StandardSnackbar"
        />
      );
    });

    expect(screen.getByText('Error and Outlined StandardSnackbar')).toBeInTheDocument();
  });
});