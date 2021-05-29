import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { Lock, Visibility, VisibilityOff, EnhancedEncryption } from '@material-ui/icons';
import { 
  makeStyles, Paper, Modal, Fade, Button, Box, Grid, Typography, InputAdornment, IconButton
} from '@material-ui/core';
import { TextInput } from 'src/shared/components';
import { textInputErrorMessage } from 'src/shared/constants/functions';
import { secretsOperations } from 'src/features/secrets/redux';
import { authSelectors } from 'src/features/auth/redux/authSlice';
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
    width: '45%',
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
      minheight: 325
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
  },
  randomSecretWrapper: {
    alignItems: 'center', 
    marginTop: '-15px',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      justifyContent: 'start'
    }
  },
  randomSecretBtn: {
    padding: '8px 10px',
    width: '85%',
    height: 'fit-content',
    borderRadius: 15,
    fontWeight: 600,
    color: '#FFF',
    textTransform: 'capitalize',
    backgroundColor: theme.palette.primary.darkBlue,
    '&:hover': {
      backgroundColor: theme.palette.primary.darkBlue
    }
  }
}));

const CreateSecretModal = ({ open, onClose, serverId }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const [showPass, setShowPass] = useState(false);
  const [secretName, setSecretName] = useState('');
  const [magmaSecret, setMagmaSecret] = useState('');

  const toggleVisibility = () => {
    setShowPass(!showPass);
  };

  const handleClose = () => {
    onClose();
    setSecretName('');
    setMagmaSecret('');
    setShowPass(false);
  };

  const handleCreateSecret = async () => {    
    dispatch(secretsOperations.createNewSecret({ secretName, magmaSecret, serverId, userId: user.id }))
    handleClose();
  };

  const createRandomSecret = () => {
    const newRandomSecret = Array(20).fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz._~!@-^#$')
                                     .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)])
                                     .join('');
    setMagmaSecret(newRandomSecret);
    setShowPass(true);
  };
  
  return (
    <Modal open={open}>
      <Fade in={open}>
        <Box className={classes.modal}>
          <Paper className={classes.paper}>
            <CloseIcon className={classes.close} onClick={handleClose} />

            <Grid container className={classes.content}>
              <Grid item xs={12} className={clsx(baseClasses.flexAlignCenter, classes.titleWrapper)}>
                <Lock />
                <Typography className={classes.title}>
                  Novo Secret
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography className={classes.info}>
                  Para criar um novo Secret será necessário informar o nome do Secret, para identicá-lo
                  e a senha que você deseja guardar, conhecida também como <b>MagmaSecret</b>.
                </Typography>
              </Grid>

              <Grid item md={8} xs={12} className={baseClasses.mt30}>
                <TextInput 
                  label="Nome do novo Secret"
                  value={secretName}
                  onChange={setSecretName}
                  errorMessage={textInputErrorMessage({ input: secretName, min: 2, max: 50 })}
                  min={2}
                  max={50}
                  required
                />
              </Grid>

              <Grid container className={baseClasses.mt15}>
                <Grid item md={8} xs={12}>
                  <TextInput 
                    label="MagmaSecret"
                    value={magmaSecret}
                    onChange={setMagmaSecret}
                    errorMessage={textInputErrorMessage({ input: magmaSecret, min: 6, max: 30 })}
                    min={6}
                    max={50}
                    showPassword={showPass}
                    required
                    type="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleVisibility}
                        >
                          {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>

                <Grid item md={4} xs={8} className={clsx(baseClasses.flexEnd, classes.randomSecretWrapper)}>
                    <Button 
                      className={classes.randomSecretBtn}
                      onClick={createRandomSecret}
                      startIcon={<EnhancedEncryption />}
                    >
                      Gerar Secret
                    </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} className={baseClasses.mt25}>
                <div className={baseClasses.flexEnd}>
                  <Button 
                    className={classes.secondaryBtn} 
                    onClick={handleClose}
                  >
                    Voltar
                  </Button>

                  <Button 
                    className={classes.primaryBtn}
                    onClick={handleCreateSecret}
                    disabled={!(secretName.length > 2 && secretName.length < 50)}
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

CreateSecretModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  serverId: PropTypes.string
};

CreateSecretModal.defaultProps = {
  serverId: ''
};

export default CreateSecretModal;