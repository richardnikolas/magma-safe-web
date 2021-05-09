import React from 'react';
import { Backdrop, makeStyles, useTheme } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 9999
  }
}));

const LoaderThreeDots = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Backdrop className={classes.backdrop} open data-testid="loaderThreeDots">
      <Loader 
        type="ThreeDots"
        height={150}
        width={150}
        color={theme.palette.primary.grayReddish}
      />
    </Backdrop>
  );
};

export default LoaderThreeDots;