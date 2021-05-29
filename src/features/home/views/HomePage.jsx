import React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import baseStyles from 'src/shared/constants/baseStyles';
import homeVolcanoGif from 'src/shared/assets/gif/homeVolcano.gif';
import './components/home.css';

const useStyles = makeStyles(() => ({
  homeContainer: {
    background: ` linear-gradient(
      rgba(0, 0, 0, 0.65), 
      rgba(0, 0, 0, 0.65)
    ), url(${homeVolcanoGif})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'    
  },
  magmaTitle: {
    fontFamily: 'Changa',
    marginTop: '-5%',
    marginLeft: '-5%',
    '@media (max-width: 660px)': {
      fontSize: '14vh !important',
      padding: '0 30px',
      wordBreak: 'break-word',
      lineHeight: 0.8
    }
  }
}));

const HomePage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();

  return (
    <Grid container className={clsx(baseClasses.pageContainer, classes.homeContainer)}>
      <Grid item xs={12}>
        <Typography className={clsx("title", classes.magmaTitle)}>
          MagmaSafe
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;