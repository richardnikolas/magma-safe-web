import React from 'react';
import { Backdrop, makeStyles, useTheme } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const MagmaLoader = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Backdrop className={classes.backdrop} open>
      <Loader 
        type="TailSpin"
        height={150}
        width={150}
        color={theme.palette.primary.grayReddish}
      />
    </Backdrop>
  );
};

export default MagmaLoader;