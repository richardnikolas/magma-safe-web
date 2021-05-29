import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Grid, Typography, Paper, Button, useTheme } from '@material-ui/core';
import { Add, StarRounded, StarBorderRounded } from '@material-ui/icons';
import { LabeledText } from 'src/shared/components';
import { CreateSecretModal } from 'src/features/secrets/views/components';
import { secretsActions } from 'src/features/secrets/redux';
import { updateServerIsFavorite } from 'src/features/servers/redux/serversOperations';
import { cleanAddUserToServer } from 'src/features/servers/redux/serversActions';
import baseStyles from 'src/shared/constants/baseStyles';
import AddUserToServerModal from './AddUserToServerModal';

const useStyles = makeStyles((theme) => ({
  serverName: {
    fontWeight: 800,
    fontSize: 25
  },
  card: {
    padding: '20px 30px',
    borderRadius: 20
  },
  primaryBtn: {
    padding: '10px 20px',
    borderRadius: 15,
    fontWeight: 600,
    textTransform: 'capitalize',
    margin: '0 10px',
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  star: {
    fontSize: '2.70rem',
    marginRight: 10,
    cursor: 'pointer'
  },
  favorite: {
    color: '#FC8C4E'
  }
}));

const ServerCard = ({ server, user }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleCloseSecretsModal = () => {
    dispatch(secretsActions.cleanCreateNewSecret);
    setIsSecretModalOpen(false);
  };

  const handleCloseUserModal = () => {
    dispatch(cleanAddUserToServer);
    setIsUserModalOpen(false);
  };

  const handleToggleSecretModal = () => {
    setIsSecretModalOpen(!isSecretModalOpen);
  };

  const handleToggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  const updateIsFavorite = () => {
    dispatch(updateServerIsFavorite({ 
      serverId: server?.server.id,
      userId: user?.id,
      isFavorite: !server.isFavorite
    }));
  };

  return (
    <>
      <Paper className={classes.card}>
        <Grid container>
          <Grid item md={5} xs={12}>
            <Typography className={classes.serverName}>
              {server?.server?.name}
            </Typography>
          </Grid>

          <Grid item md={7} className={clsx(baseClasses.flexEnd, baseClasses.flexAlignCenter)}>
            {server.isFavorite ? 
              <StarRounded 
                onClick={updateIsFavorite}
                className={classes.star}
                style={{ color: '#FC8C4E' }}
              />
              :
              <StarBorderRounded 
                onClick={updateIsFavorite}
                className={classes.star}
                style={{ color: '#FC8C4E' }}
              />
            }

            <Button 
              className={classes.primaryBtn}
              startIcon={<Add />}
              onClick={handleToggleSecretModal}
            >
              Novo Secret
            </Button>

            {user?.isAdmin ?
              <Button 
                className={classes.primaryBtn}
                startIcon={<Add />}
                onClick={handleToggleUserModal}
              >
                Adicionar Usuário
              </Button>
              :
              null
            }            
          </Grid>
        </Grid>

        <Grid container className={baseClasses.mt10}>
          <Grid item style={{ marginRight: 70 }}>
            <LabeledText 
              label="Administrador" 
              value={server.adminName} 
              labelStyles={{ fontSize: 14, color: theme.palette.primary.main }}
            />
          </Grid>

          <Grid item style={{ marginRight: 70 }}>
            <LabeledText 
              label="Qnt de Usuários" 
              value={server.usersCount} 
              labelStyles={{ fontSize: 14, color: theme.palette.primary.main }}
            />
          </Grid>

          <Grid item>
            <LabeledText 
              label="Qnt de Secrets" 
              value={server.secretsCount} 
              labelStyles={{ fontSize: 14, color: theme.palette.primary.main }}
            />
          </Grid>
        </Grid>
      </Paper>

      <CreateSecretModal 
        open={isSecretModalOpen} 
        onClose={handleCloseSecretsModal} 
        serverId={server?.server?.id} 
      />

      <AddUserToServerModal 
        open={isUserModalOpen} 
        onClose={handleCloseUserModal} 
        serverId={server?.server?.id} 
      />
    </>
  );
};

ServerCard.propTypes = {
  server: PropTypes.object,
  user: PropTypes.object
};

ServerCard.defaultProps = {
  server: {},
  user: {}
};

export default ServerCard;