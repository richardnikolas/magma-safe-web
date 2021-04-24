import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import NumberFormat from 'react-number-format';
import LabeledText from './LabeledText';

describe('Render <LabeledText />', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should render <LabeledText />', async () => {
    await act(async () => {
      render(<LabeledText label="Tipo de seguro" value="Garantia Teste" />);
    });
    expect(screen.getByText(/Tipo de seguro/i)).toBeInTheDocument();
    expect(screen.getByText(/Garantia Teste/i)).toBeInTheDocument();
  });

  it('should render <LabeledText /> with children', async () => {
    await act(async () => {
      render(
        <LabeledText label="Cliente">
          <NumberFormat
            value="00000000000000"
            displayType="text"
            format="##.###.###/####-##"
            style={{ display: 'block', marginTop: 3 }}
          />
        </LabeledText>
      );
    });
    expect(screen.getByText(/Cliente/i)).toBeInTheDocument();
    expect(screen.getByText('00.000.000/0000-00')).toBeInTheDocument();
  });
});
