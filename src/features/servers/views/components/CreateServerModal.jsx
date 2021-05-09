import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Paper, Modal, Fade, Button, Box, Grid, Typography } from '@material-ui/core';
import { TextInput } from 'src/shared/components';
import { textInputErrorMessage } from 'src/shared/constants/functions';
import { serversOperations } from 'src/features/servers/redux';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import DnsIcon from '@material-ui/icons/Dns';
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
    height: 300,
    position: 'relative',
    borderRadius: 20,
    '@media (min-width: 1600px)': {
      width: '30%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '85%',
      height: 325
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

const CreateServerModal = ({ open, onClose }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const [serverName, setServerName] = useState('');
  
  const handleCreateServer = async () => {    
    await dispatch(serversOperations.createNewServer({ adminId: user.id, serverName }));
    onClose();
    setServerName('');
  }

  return (
    <Modal
      open={open}
    >
      <Fade in={open}>
        <Box className={classes.modal}>
          <Paper className={classes.paper}>
            <CloseIcon className={classes.close} onClick={onClose} />

            <Grid container className={classes.content}>
              <Grid item xs={12} className={clsx(baseClasses.flexAlignCenter, classes.titleWrapper)}>
                <DnsIcon />
                <Typography className={classes.title}>
                  Novo Server
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.info}>
                  Para criar um novo Server nós só precisamos de um nome.
                  Insira um novo no campo abaixo:
                </Typography>
              </Grid>

              <Grid item xs={12} className={baseClasses.mt15}>
                <TextInput 
                  label="Nome do novo Server"
                  value={serverName}
                  onChange={setServerName}
                  errorMessage={textInputErrorMessage({ input: serverName, min: 2, max: 50 })}
                  min={2}
                  max={50}
                  required
                />
              </Grid>

              <Grid item xs={12} className={baseClasses.mt15}>
                <div className={baseClasses.flexEnd}>
                  <Button 
                    className={classes.secondaryBtn} 
                    onClick={onClose}
                  >
                    Voltar
                  </Button>

                  <Button 
                    className={classes.primaryBtn}
                    onClick={handleCreateServer}
                    disabled={!(serverName.length > 2 && serverName.length < 50)}
                  >
                    Criar
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

CreateServerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CreateServerModal;