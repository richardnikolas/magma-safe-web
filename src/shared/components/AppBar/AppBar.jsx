import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, MuiAppBar, Typography, Divider } from '@material-ui/core/AppBar';
import { Logo } from 'src/shared/assets/svg';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    width: '100%'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 100,
    textAlign: 'center'
  }
}));

const AppBar = () => {
  const classes = useStyles();

  return (
    <>
    </>
  );
};

export default AppBar;