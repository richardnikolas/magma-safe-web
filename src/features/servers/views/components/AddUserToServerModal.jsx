import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Paper, Modal, Fade, Button, Box, Grid, Typography } from '@material-ui/core';
import { TextInput } from 'src/shared/components';
import { serversOperations } from 'src/features/servers/redux';
import AccountBox from '@material-ui/icons/AccountBox';
import { validateEmail } from 'src/shared/helpers/validators';
import baseStyles from 'src/shared/constants/baseStyles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },
  paper: {
    width: '40%',
    position: 'relative',
    borderRadius: 20,
    '@media (min-width: 1600px)': {
      width: '30%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '85%'
    }
  },
  content: {
    padding: '20px 35px'
  },
  close: {
    color: theme.palette.secondary.main,
    padding: 4,
    cursor: 'pointer',
    position: 'absolute',
    top: 15,
    right: 15
  },
  titleWrapper: {
    margin: '15px 0'
  },
  title: {
    display: 'inline',
    fontSize: 24,
    fontWeight: 700,
    marginLeft: 10
  },
  primaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    '&:disabled': {
      backgroundColor: theme.palette.primary.gray
    }
  },
  secondaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    border: `1px solid #FFFFFF`,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      border: `1px solid ${theme.palette.primary.main}`
    },
    '&:disabled': {
      backgroundColor: theme.palette.primary.gray
    }
  }
}));

const AddUserToServerModal = ({ open, onClose, serverId }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');
  
  const handleClose = () => {
    onClose();
    setUserEmail('');
  };

  const handleAddUserToServer = () => {
    dispatch(serversOperations.addUserToServer({ serverId, userEmail }));
    handleClose();
  };

  return (
    <Modal open={open}>
      <Fade in={open}>
        <Box className={classes.modal}>
          <Paper className={classes.paper}>
            <CloseIcon className={classes.close} onClick={handleClose} />

            <Grid container className={classes.content}>
              <Grid item xs={12} className={clsx(baseClasses.flexAlignCenter, classes.titleWrapper)}>
                <AccountBox />
                <Typography className={classes.title}>
                  Adicionar Usuário
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.info}>
                  Para adicionar um usuário ao Server nós só precisamos do email deste usuário.<br />
                  <b>OBS:</b> O usuário precisa estar cadastrado no sistema para ser adicionado.<br />
                </Typography>
              </Grid>

              <Grid item xs={12} className={baseClasses.mt15}>
                <TextInput 
                  label="Email do usuário"
                  value={userEmail}
                  onChange={setUserEmail}
                  isValid={validateEmail}
                  errorMessage='E-mail inválido'
                  required
                />
              </Grid>

              <Grid item xs={12} className={baseClasses.mt15}>
                <div className={baseClasses.flexEnd}>
                  <Button 
                    className={classes.secondaryBtn} 
                    onClick={handleClose}
                  >
                    Voltar
                  </Button>

                  <Button 
                    className={classes.primaryBtn}
                    onClick={handleAddUserToServer}
                    disabled={!validateEmail(userEmail)}
                  >
                    Adicionar
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

AddUserToServerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  serverId: PropTypes.string
};

AddUserToServerModal.defaultProps = {
  serverId: ''
};

export default AddUserToServerModal;

