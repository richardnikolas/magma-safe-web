import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, Grid, Paper, Avatar, Typography, Chip, useTheme } from '@material-ui/core';
import { authSelectors } from 'src/features/auth/redux/authSlice';
import { LabeledText } from 'src/shared/components';
import baseStyles from 'src/shared/constants/baseStyles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.darkRedBrown,
    minHeight: '100%',
    alignItems: 'center',
    padding: '70px 0 50px 80px',
    [theme.breakpoints.up('xs')]: {
      padding: '60px 0 50px 0'
    }
  },
  profileCard: {
    backgroundColor: '#FFF',
    minHeight: 300,
    borderRadius: 20,
    padding: '0 30px',
    fontSize: 18
  },
  avatar: {
    width: 110,
    height: 110,
    marginTop: '-55px',
    fontSize: 40,
    backgroundColor: theme.palette.primary.salmon
  },
  input: {
    color: theme.palette.primary.main
  },
  chip: {
    marginTop: 10,
    padding: 5,
    color: '#FFF'
  },
  chipAdmin: {    
    backgroundColor: theme.palette.primary.darkBlue  
  },
  chipUser: {
    backgroundColor: theme.palette.primary.darkGray
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  const baseClasses = baseStyles();
  const theme = useTheme();
  const dbUser = useSelector(authSelectors.getUser);

  const labelStyles = {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 600
  };

  const getTwoFirstLetters = (name) => {
    const arrayName = name.split(' ');
    let firstLetter = '';
    let secondLetter = '';

    firstLetter = arrayName[0].substring(0,1);
    if (arrayName.length > 1)
      secondLetter = arrayName[1].substring(0,1);

    return `${firstLetter}${secondLetter}`;
  };

  return (
    <Grid container justify="center"className={classes.container}>
      <Grid item md={5} xs={11}>

        <Paper elevation={4} className={classes.profileCard}>
          <Grid container justify="center">
            <Grid item>
              <Avatar alt={dbUser?.name} className={classes.avatar}>                
                {getTwoFirstLetters(dbUser?.name)}                
              </Avatar>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>              
              <LabeledText label="Name" value={dbUser?.name} labelStyles={{...labelStyles}} valueStyles={{ fontSize: 18 }}/>
            </Grid>

            <Grid item xs={12} className={baseClasses.mt15}>              
              <LabeledText label="Email" value={dbUser?.email} labelStyles={{...labelStyles}} valueStyles={{ fontSize: 18 }} />
            </Grid>
            
            <Grid item xs={12} className={baseClasses.mt15}>              
              <Typography style={{ ...labelStyles }}>
                Tipo de usuário
              </Typography>
              {dbUser?.isAdmin ? 
                <Chip label="Admin" className={clsx(classes.chip, classes.chipAdmin)} /> 
                : 
                <Chip label="User" className={clsx(classes.chip, classes.chipUser)} />
              }
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    </Grid>
  );
};

export default ProfilePage;
