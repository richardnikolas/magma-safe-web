import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import SelectInput from './SelectInput';

const options = [
  {
    title: 'Opção 1',
    value: 1
  },
  {
    title: 'Opção 2',
    value: 2
  },
  {
    title: 'Opção 3',
    value: 3
  },
  {
    title: 'Opção 4',
    value: 4
  }
];

describe('Render <SelectInput />', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render <SelectInput />', async () => {
    await act(async () => {
      render(
        <SelectInput 
          id="select-input-test" 
          options={options}           
          attribute="title" 
          placeholder="Selecione uma opção"
          onChange={jest.fn()}
        />
      );
    });

    expect(screen.getByLabelText('Selecione uma opção')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('textbox'));
    });

    setTimeout(() => {
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
      expect(screen.getByText('Opção 2')).toBeInTheDocument();
      expect(screen.getByText('Opção 3')).toBeInTheDocument();
      expect(screen.getByText('Opção 4')).toBeInTheDocument();
    }, 150);
  });
});