import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Slide } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SlideTransition = (props) => <Slide {...props} direction="right" />

const StandardSnackbar = ({ variant, severity, message, open, handleClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={handleClose}
    TransitionComponent={SlideTransition}
  >
    <Alert severity={severity} variant={variant} onClose={handleClose}>
      {message}
    </Alert>
  </Snackbar>
);

StandardSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
  severity: PropTypes.string  
};

StandardSnackbar.defaultProps = {
  variant: 'filled',
  severity: 'info'
};

export default StandardSnackbar;
