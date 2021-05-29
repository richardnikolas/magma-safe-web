import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Typography, Paper } from '@material-ui/core';
import baseStyles from 'src/shared/constants/baseStyles';
import SecretAccordion from './SecretAccordion';

const useStyles = makeStyles(() => ({
  card: {
    padding: '20px 30px 30px',
    borderRadius: 20,
    maxHeight: '55vh',
    overflow: 'auto'
  },
  cardTitle: {
    fontWeight: 800,
    fontSize: 25
  },
  infoMessage: {
    textAlign: 'center',
    padding: '15px 0 5px'
  }
}));

const SecretsCard = ({ server, serverSecrets, user }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();

  return (
    <Paper className={classes.card}>
      <Grid container>
        <Grid item md={12}>
          <Typography className={classes.cardTitle}>
            Secrets de {server?.server?.name}
          </Typography>
        </Grid>

        <Grid item md={12} className={baseClasses.mt10}>
          {serverSecrets.length > 0 ? 
              serverSecrets.map(secret => (
                <SecretAccordion secret={secret} key={secret.name} user={user} />
              )) 
            : 
              <Typography className={classes.infoMessage}>
                Não encontramos nenhum Secret cadastrado neste servidor.<br />
                Para criar um Secret basta clicar no botão <span className={baseClasses.highlightedInfo}>+ Novo Secret</span>
              </Typography>
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

SecretsCard.propTypes = {
  server: PropTypes.object,
  serverSecrets: PropTypes.array,
  user: PropTypes.object
};

SecretsCard.defaultProps = {
  server: {},
  serverSecrets: [],
  user: {}
};

export default SecretsCard;