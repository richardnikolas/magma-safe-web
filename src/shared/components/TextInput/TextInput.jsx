import React from 'react';
import PropTypes from 'prop-types';
import { inRange } from 'lodash';
import { BaseInput } from '../BaseInput';

const TextInput = ({ isValid, min, max, required, ...otherProps }) => {
  const handleIsValid = (value) => {
    if (!required && !value)
      return true;
    
    return isValid(value) && inRange(value.length, min, max);
  };
  return <BaseInput isValid={handleIsValid} required={required} {...otherProps} />;
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.func,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  type: PropTypes.string,
  showPassword: PropTypes.bool,
  required: PropTypes.bool
};

TextInput.defaultProps = {
  isValid: (value) => !!value,
  errorMessage: 'Preenchimento obrigatório',
  onBlur: () => {},
  label: '',
  placeholder: '',
  min: 0,
  max: 500,
  disabled: false,
  endAdornment: null,
  type: 'text',
  showPassword: false,
  required: false
};

export default TextInput;
