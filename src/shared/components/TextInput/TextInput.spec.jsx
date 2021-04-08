import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen } from '@testing-library/react';
import TextInput from './TextInput';

describe('Render <TextInput />', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render <TextInput />', async () => {
    await act(async () => {
      render(<TextInput value="" onChange={() => {}} />);
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
