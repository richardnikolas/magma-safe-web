import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { authActions } from 'src/features/auth/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Logo } from 'src/shared/assets/svg';
import baseStyles from 'src/shared/constants/baseStyles';
import { homeActions } from 'src/features/home/redux';
import { homeSelectors } from 'src/features/home/redux/homeSlice';
import MagmaDrawer from './MagmaDrawer';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.primary.gray,
    height: 40
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(1)
    }
  },
  hide: {
    display: 'none'
  },
  title: {
    fontFamily: 'Changa',
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 28,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  logo: {
    width: 55,
    marginRight: 10
  },
  userWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'    
  },
  userName: {
    color: theme.palette.primary.darkRedBrown,
    marginRight: 20
  },
  logoutBtn: {
    width: 100,
    backgroundColor: theme.palette.primary.darkRedBrown,
    color: theme.palette.primary.gray,
    borderRadius: 15,
    padding: 8,   
    '&:hover': {
      backgroundColor: theme.palette.primary.darkRedBrown
    },
    [theme.breakpoints.down('xs')]: {
      width: 85
    }
  }
}));

const MagmaAppBar = ({ dbUser }) => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const isDrawerOpen = useSelector(homeSelectors.getIsDrawerOpen);
  const classes = useStyles();
  const baseClasses = baseStyles();

  const handleDrawerOpen = () => {
    dispatch(homeActions.toggleDrawer());
  };

  const handleLogout = async () => {
    await logout();
    dispatch(authActions.setUserLoggintOut(true));    
    try {
      localStorage.removeItem('loggedUser');
    } catch {}
  };

  return (
    <div className={baseClasses.flexRow}>
      <AppBar 
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, isDrawerOpen && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          <div className={baseClasses.flexTrueCenter}>
            <img src={Logo} alt="MagmaSafe Logo" className={classes.logo}/>
            <Typography className={classes.title}>
              MagmaSafe
            </Typography>
          </div>

          <div className={classes.userWrapper}>
            <Typography className={classes.userName}>
              {dbUser?.name ?? ''}
            </Typography>
            <Button onClick={handleLogout} className={classes.logoutBtn}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <MagmaDrawer isOpen={isDrawerOpen} handleDrawerOpen={handleDrawerOpen}/>
    </div>
  );
};

MagmaAppBar.propTypes = {
  dbUser: PropTypes.object
};

MagmaAppBar.defaultProps = {
  dbUser: {}
};

export default MagmaAppBar;