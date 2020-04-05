import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import StarsIcon from "@material-ui/icons/Stars";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToApp from "@material-ui/icons/ExitToApp";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function MainDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const links = [
    {
      label: 'Starred Messages',
      icon: <StarsIcon/>,
      url: '/starred'
    },{
      label: 'New Group',
      icon: <GroupAddIcon/>,
      url: '/settings'
    },{
      label: 'Settings',
      icon: <SettingsIcon/>,
      url: '/settings'
    }
  ];

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{display: "flex", flexDirection: "column", height: "100%"}}
    >
      <List>
        {links.map((link)=> (
          <ListItem button key={link.url} style={{flexGrow: "0"}}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
      <div className="vertical-strecth" style={{height: "100%"}}></div>
      <Divider />
      <List>
        <ListItem button style={{flexGrow: "0"}}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout"/>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('left', true)} style={{position: "fixed", top: "0", left: "0"}}>
        <MenuIcon style={{ color: "white" }}></MenuIcon>
      </IconButton>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}
