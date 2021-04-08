import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const BaseNumberFormat = (props) => {
  const { value, onChange, inputRef, ...other } = props;

  return (
    <NumberFormat
      {...other}
      value={value || ''}
      allowLeadingZeros
      onValueChange={({ value: _value }) => {
        onChange({ target: { value: _value } });
      }}
      getInputRef={inputRef}
    />
  );
};

BaseNumberFormat.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  mask: PropTypes.string,
  isAllowed: PropTypes.func
};

BaseNumberFormat.defaultProps = {
  format: null,
  mask: ' ',
  isAllowed: null
};

export default BaseNumberFormat;
