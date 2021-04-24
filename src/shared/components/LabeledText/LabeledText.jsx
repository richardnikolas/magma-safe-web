import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: '#9DA8B6',
    fontSize: '1rem',
    display: 'block'
  },
  input: {
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  inputComplement: {
    fontSize: '0.9rem',
    paddingBottom: 3
  }
}));

const LabelValue = ({ value, complementValue }) => {
  const classes = useStyles();

  if (!complementValue) 
    return <Typography className={classes.input}>{value}</Typography>;

  return (
    <>
      <Typography className={classes.input}>{value}</Typography>
      <Typography className={clsx(classes.input, classes.inputComplement)}>
        {complementValue}
      </Typography>
    </>
  );
};

LabelValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  complementValue: PropTypes.string
};

LabelValue.defaultProps = {
  value: '',
  complementValue: null
};

const LabeledText = ({ label, value, complementValue, children, labelStyles, valueStyles }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.inputLabel} style={{...labelStyles}}>
        {label}
      </Typography>
      {children || <LabelValue value={value} complementValue={complementValue} style={{...valueStyles}} />}
    </div>
  );
};

LabeledText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  complementValue: PropTypes.string,
  children: PropTypes.node,
  labelStyles: PropTypes.object,
  valueStyles: PropTypes.object
};

LabeledText.defaultProps = {
  value: '',
  complementValue: null,
  children: null,
  labelStyles: { },
  valueStyles: { }
};

export default LabeledText;
