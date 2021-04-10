import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Tooltip from '../Tooltip/Tooltip';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '100%',
    fontWeight: 400,
    marginBottom: 22
  },
  helperText: {
    marginBottom: -22
  }
});

const BaseInput = ({
  value,
  onChange,
  onBlur,
  label,
  isValid,
  errorMessage,
  required,
  inputComponent,
  tooltip,
  inputIsInvalid,
  propertyName,
  ...props
}) => {
  const classes = useStyles();
  const [hasError, setError] = useState(false);

  if (inputComponent) props.inputComponent = inputComponent;
  const { disabled } = props;

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        {label && (
          <InputLabel error={hasError || inputIsInvalid} required={required} disabled={disabled}>
            {label}
          </InputLabel>
        )}
        <Input
          error={hasError || inputIsInvalid}
          value={value}
          onChange={(e) => {
            onChange(e.target.value, isValid(e.target.value), propertyName);
            setError(false);
          }}
          onBlur={() => {
            if (!isValid(value)) setError(true);
            else if (onBlur) onBlur(value);
          }}
          {...props}
          endAdornment={tooltip !== null ? <Tooltip title={tooltip} /> : <></>}
        />
        {(hasError || inputIsInvalid) && (
          <FormHelperText className={classes.helperText} error={hasError || inputIsInvalid} data-testid="base-input-helper">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

BaseInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.func,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  inputComponent: PropTypes.func,
  tooltip: PropTypes.string,
  inputIsInvalid: PropTypes.bool,
  propertyName: PropTypes.string
};

BaseInput.defaultProps = {
  onBlur: () => {},
  label: '',
  placeholder: '',
  isValid: () => true,
  errorMessage: '',
  disabled: false,
  required: false,
  inputComponent: null,
  tooltip: null,
  inputIsInvalid: false,
  propertyName: null
};

export default BaseInput;
