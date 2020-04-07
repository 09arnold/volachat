import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ExitToApp from "@material-ui/icons/ExitToApp";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import StarsIcon from "@material-ui/icons/Stars";
import SettingsIcon from "@material-ui/icons/Settings";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'absolute'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 2,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const links = [
  {
    label: 'Starred Messages',
    icon: <StarsIcon />,
    url: '/starred'
  }, {
    label: 'New Group',
    icon: <GroupAddIcon />,
    url: '/new-group'
  }, {
    label: 'Settings',
    icon: <SettingsIcon />,
    url: '/settings'
  }
];

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [themeIcon, setThemeIcon] = React.useState(<NightsStayIcon />);
  const [themeLabel, setThemeLabel] = React.useState('Dark Mode');

  const handleDrawerOpen = () => { setOpen(true) };

  const handleDrawerClose = () => { setOpen(false) };


  const toggleThemeI = () => {
    if (themeLabel === "Dark Mode") {
      props.toggleTheme('dark');
      setThemeIcon(<WbSunnyIcon />);
      setThemeLabel("Light Mode")
    } else {
      props.toggleTheme('light');
      setThemeIcon(<NightsStayIcon />);
      setThemeLabel("Dark Mode")
    }
  }

  let menuButton = open ? (
    <ListItem style={{ flexGrow: "0" }}>
      <ListItemIcon><MenuIcon onClick={handleDrawerClose} /></ListItemIcon>
      <ListItemText primary="VolaChat" />
    </ListItem>
  ) : (
      <ListItem button style={{ flexGrow: "0" }} onClick={handleDrawerOpen}>
        <ListItemIcon><MenuIcon /></ListItemIcon>
        <ListItemText primary="VolaChat" />
      </ListItem>
    );

  return (
    <div className={classes.root} style={{ position: 'aboslute' }}>
      <ClickAwayListener onClickAway={handleDrawerClose}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div>
            {menuButton}
          </div>
          <Divider variant="middle" />
          <List>
            {links.map((link) => (
              <ListItem button key={link.url} style={{ flexGrow: "0" }}>
                <Tooltip title={link.label}>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider variant="middle" />
          <ListItem button style={{ flexGrow: "0" }} onClick={toggleThemeI}>
            <Tooltip title={themeLabel}>
              <ListItemIcon>{themeIcon}</ListItemIcon>
            </Tooltip>
            <ListItemText primary={themeLabel} />
          </ListItem>
          <Divider variant="middle" />
          <div className="vertical-strecth" style={{ height: "100%" }}></div>
          <Divider variant="middle" />
          <List>
            <ListItem button style={{ flexGrow: "0" }}>
              <Tooltip title={'Logout'}>
                <ListItemIcon><ExitToApp /></ListItemIcon>
              </Tooltip>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer >
      </ClickAwayListener>
    </div>
  );
}