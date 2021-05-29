import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import { routes } from 'src/shared/constants';
import baseStyles from 'src/shared/constants/baseStyles';
import volcanoGif from 'src/shared/assets/gif/volcano.gif';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px 30px'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 60,
    textAlign: 'center',
    fontFamily: 'Changa',
    [theme.breakpoints.down('xs')]: {
      fontSize: 55,
      marginTop: 20
    }
  },
  text: {
    color: '#FFFFFF',
    margin: '10px 0 40px 0',
    fontSize: 18,
    textAlign: 'center'
  },
  gif: {
    width: '42%',
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  },
  homeBtn: {
    padding: '15px 20px',
    borderRadius: 15,
    fontWeight: 600,
    marginTop: 25,
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    transition: 'all 0.2s ease-out',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      transform: 'scale(1.075, 1.075)'
    }
  }
}));

const ErrorPage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const { push } = useHistory();

  return (
    <Grid container className={baseClasses.pageContainer}>
      <Grid item xs={12} className={classes.wrapper}>

        <Typography className={classes.title}>
          Ops! Algo deu errado.
        </Typography>

        <Typography className={classes.text}>
          Algo na aplicação não ocorreu como esperado.<br />Tente novamente ou aguarde um pouco para realizar sua ação pretendida.
        </Typography>

        <img src={volcanoGif} alt="Volcano Gif" className={classes.gif} />

        <Button className={classes.homeBtn} onClick={() => push(routes.home.path)}>
          Voltar para Home
        </Button>     
      </Grid>
    </Grid>
  );
};

export default ErrorPage;