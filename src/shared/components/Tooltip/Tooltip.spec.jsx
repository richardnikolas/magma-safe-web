import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput/TextInput';

const tooltipTitle = 'Essas são infomações relevantes para o usuário';

describe('Render <Tooltip />', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render <Tooltip /> inside a <TextInput />', async () => {
    await act(async () => {
      render(
        <TextInput 
          value=""
          onChange={jest.fn()}
          tooltip={tooltipTitle} />
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('tooltip-component'));
    });

    setTimeout(() => {
      expect(screen.getByText(tooltipTitle)).toBeInTheDocument();
    }, 500);

    await act(async () => {
      fireEvent.click(screen.getByRole('textbox'));
    });
  });
});
