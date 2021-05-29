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

const SecretsCustomToolbar = ({ handleClickNewSecret }) => {
  const classes = useStyles();

  return (
    <>
      <Button 
        className={classes.primaryBtn}
        startIcon={<AddIcon />}
        onClick={handleClickNewSecret}
        style={{ marginLeft: 15 }}
      >
        Novo Secret
      </Button>
    </>
  );
};

SecretsCustomToolbar.propTypes = {
  handleClickNewSecret: PropTypes.func
};

SecretsCustomToolbar.defaultProps = {
  handleClickNewSecret: () => {}
};

export default SecretsCustomToolbar;