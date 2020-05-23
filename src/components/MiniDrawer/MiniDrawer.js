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

import StarredMessages from "./StarredMessages";
import NewGroup from './NewGroup';
import NewMessageMenuItem from './NewChatMenuItem';
import Settings from './SettingsMenuItem';
import ThemeSelector from './ThemeSelector';

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

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => { setOpen(true) };

  const handleDrawerClose = () => { setOpen(false) };

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
            <NewMessageMenuItem />
            <StarredMessages />
            <NewGroup />
            <Settings />
          </List>
          <Divider variant="middle" />
          <div className="vertical-strecth" style={{ height: "100%" }}></div>
          <Divider variant="middle" />
          <List>
            <ThemeSelector toggleTheme={props.toggleTheme} />
          </List>
        </Drawer >
      </ClickAwayListener>
    </div>
  );
}