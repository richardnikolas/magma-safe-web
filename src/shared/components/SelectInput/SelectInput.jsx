import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.MuiAutocomplete-option[data-focus="true"]': {
      backgroundColor: `${theme.palette.primary.main}28`
    }
  },
  root: {
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: 'transparent'
    },
    '& .MuiChip-root': {
      backgroundColor: `${theme.palette.primary.main}28`
    }
  }
}));

const SelectInput = ({ 
  id, 
  value, 
  options, 
  attribute, 
  onChange, 
  placeholder, 
  size, 
  required, 
  error, 
  disabled,
  propertyName
}) => {
  const classes = useStyles();

  return (
    <>
      <Autocomplete
        id={id}
        options={options}
        value={value}
        onChange={(_event, newValue) => {
          onChange(newValue, true, propertyName);
        }}
        getOptionLabel={option => option && attribute ? option[attribute] : option}
        renderInput={(params) => 
          <TextField label={placeholder} variant="standard" required={required} className={classes.root} {...params} />
        }
        size={size}
        disabled={disabled}
        className={classes.root}
      /> 
      {error && <FormHelperText error>{error}</FormHelperText>} 
    </>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  attribute: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  size: PropTypes.string,
  propertyName: PropTypes.string
};

SelectInput.defaultProps = {
  value: undefined,
  required: false,
  attribute: null,
  disabled: false,
  error: null,
  size: 'medium',
  propertyName: null
};

export default SelectInput;
