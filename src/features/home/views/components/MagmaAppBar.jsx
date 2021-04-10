import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { authActions } from 'src/features/auth/redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar, AppBar, IconButton, Typography, Divider, Drawer } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft } from '@material-ui/icons';
import { Logo } from 'src/shared/assets/svg';
import baseStyles from 'src/shared/constants/baseStyles';

const drawerWidth = 240;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.gray
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  },
  hide: {
    display: 'none'
  },
  title: {
    fontFamily: 'League Spartan',
    color: theme.palette.primary.main,
    fontWeight: 800,
    fontSize: 22
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.gray,
    borderRadius: 15,
    padding: 8,   
    '&:hover': {
      backgroundColor: theme.palette.primary.darkRedBrown
    }
  }
}));

const MagmaAppBar = ({ dbUser }) => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();
  const baseClasses = baseStyles();

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    await logout();
    dispatch(authActions.setUserLoggintOut(true));    
  };

  return (
    <div className={baseClasses.flexRow}>
      <AppBar 
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
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

      <Drawer 
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
       >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
      </Drawer>
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