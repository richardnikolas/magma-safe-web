import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  primaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const ServersCustomToolbar = ({ handleClickNewServer }) => {
  const classes = useStyles();

  return (
    <>
      <Button 
        className={classes.primaryBtn}
        startIcon={<AddIcon />}
        onClick={handleClickNewServer}
        style={{ marginLeft: 15 }}
      >
        Novo Server
      </Button>
    </>
  );
};

ServersCustomToolbar.propTypes = {
  handleClickNewServer: PropTypes.func
};

ServersCustomToolbar.defaultProps = {
  handleClickNewServer: () => {}
};

export default ServersCustomToolbar;