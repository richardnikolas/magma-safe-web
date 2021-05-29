import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { 
  makeStyles, useTheme, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton 
} from '@material-ui/core';
import { Visibility, VisibilityOff, Create, DeleteForever } from '@material-ui/icons';
import { LabeledText } from 'src/shared/components';
import { updateLastAccessedByUser } from 'src/features/secrets/redux/secretsOperations';
import { getDateFormatted, decryptAES } from 'src/shared/constants/functions';
import baseStyles from 'src/shared/constants/baseStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  accordion: {
    padding: '10px 20px',
    borderRadius: '20px !important',
    marginTop: '20px !important',
    boxShadow: '0px 1px 4px 1px rgba(0, 0, 0, 0.25)'
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.primary.darkGray
  },
  label: {
    fontSize: 14, 
    color: theme.palette.primary.main, 
    paddingBottom: 5
  },
  icon: {
    color: theme.palette.primary.darkGray,
    padding: '0 5px 5px 5px'
  },
  accordionItem: {
    '@media (max-width: 750px)': {
      marginTop: 15
    }
  }
}));

const SecretAccordion = ({ secret, user }) => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdateLastAccessedByUser = () => {
    if (user?.name !== secret.lastAccessedByUser)
      dispatch(updateLastAccessedByUser({ secretId: secret.id, userId: user?.id }))
  };

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.title}>
          {secret.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container>
          <Grid item md={3} xs={12}>
            <LabeledText 
              label="MagmaSecret" 
              labelStyles={{fontSize: 14, color: theme.palette.primary.main, paddingBottom: 5}}
            >
              <div className={baseClasses.flexAlignCenter} style={{ marginTop: '-5px' }}>
                {showPassword ?
                  <Typography className={classes.magmaSecret}>
                    {decryptAES(secret.magmaSecret)}
                  </Typography> 
                  :
                  <span>•••••••••••••••••••••••</span>              
                }
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    toggleVisibility();
                    handleUpdateLastAccessedByUser();
                  }}
                  className={classes.icon}
                  style={{ marginLeft: 10, paddingTop: 6 }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
            </LabeledText>
          </Grid>

          <Grid item md={2} xs={12} className={classes.accordionItem}>
            <LabeledText 
              label="Último Visitante" 
              value={secret.lastAccessedByUser} 
              labelStyles={{fontSize: 14, color: theme.palette.primary.main, paddingBottom: 5}}
            />
          </Grid>

          <Grid item md={2} xs={12} className={classes.accordionItem}>
            <LabeledText 
              label="Última Atualização" 
              value={getDateFormatted(secret.updatedAt)} 
              labelStyles={{fontSize: 14, color: theme.palette.primary.main, paddingBottom: 5}}
            />
          </Grid>

          <Grid item md={2} xs={12} className={classes.accordionItem}>
            <LabeledText 
              label="Ações"
              labelStyles={{fontSize: 14, color: theme.palette.primary.main, paddingBottom: 5}}
            >
              <IconButton
                aria-label="edit secret"
                className={classes.icon}
                style={{ marginLeft: '-5px' }}
              >
                <Create />
              </IconButton>

              <IconButton
                aria-label="delete secret"
                className={classes.icon}
              >
                <DeleteForever />
              </IconButton>
            </LabeledText>            
          </Grid>

        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

SecretAccordion.propTypes = {
  secret: PropTypes.object.isRequired,
  user: PropTypes.object
};

SecretAccordion.defaultProps = {
  user: {}
};

export default SecretAccordion;