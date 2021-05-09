import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@material-ui/core';
import { ChevronLeft, Menu as MenuIcon, Home, Lock, Dns, History, AccountBox } from '@material-ui/icons';
import { drawerItems } from 'src/shared/constants';
import { homeActions } from 'src/features/home/redux';

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.gray
  },
  isOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar    
  },
  menuItemClosed: {
    padding: '15px 16px 15px 22px'
  },
  menuItemOpened: {
    padding: '11px 16px 11px 22px'
  },
  menuButton: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 4
    }
  },
  hide: {
    display: 'none'
  }
}));

const getDrawerIcon = (item) => {
  const theme = useTheme();
  const styleBtn = { color: `${theme.palette.primary.darkGray}`};

  switch (item.icon) {
    case 'Home':
      return <Home style={styleBtn} />;
    case 'Lock':
      return <Lock style={styleBtn} />;
    case 'Dns':
      return <Dns style={styleBtn} />;
    case 'History': 
      return <History style={styleBtn} />
    case 'AccountBox':
      return <AccountBox style={styleBtn} />
    default:
      return null;
  }
};

const MagmaDrawer = ({ isOpen, handleDrawerOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();

  return (
    <Drawer 
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.isOpen]: isOpen,
        [classes.drawerClose]: !isOpen
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.isOpen]: isOpen,
          [classes.drawerClose]: !isOpen
        })
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
          {isOpen ? <ChevronLeft /> : <MenuIcon fontSize="large" color="primary" />}
        </IconButton>
      </div>
      <Divider />

      <List>
        {drawerItems.map((item) => (
          <ListItem
            key={item.name}  
            button 
            onClick={() => { 
              push(item.link);
              dispatch(homeActions.closeDrawer());
            }}
            className={clsx({
              [classes.menuItemClosed]: !isOpen,
              [classes.menuItemOpened]: isOpen
            })}
          >
            <ListItemIcon>{getDrawerIcon(item)}</ListItemIcon>
            {isOpen ? <ListItemText primary={item.name} /> : null}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

MagmaDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
};

export default MagmaDrawer;