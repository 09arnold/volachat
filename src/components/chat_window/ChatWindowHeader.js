import React, { useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';

import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { makeStyles } from '@material-ui/core/styles';
import { getTimeDisplay } from "../../utils/Helpers";

import CallDialog from "../call_dialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: '16px'
  },
  avatarContainer: {
    dispplay: 'flex',
    width: '100%'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    border: `1px solid ${theme.palette.action.selected}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'promary',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function ChatWindowHeader(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCallDialog, setOpenCallDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = event => { setAnchorEl(event.currentTarget) };

  const handleClose = () => { setAnchorEl(null) };

  const handleCallClicked = () => {
    // setOpenCallDialog(true);
    props.openCallDialog();
  }

  const closeCallModal = () => {
    setOpenCallDialog(false);
  }

  return (
    <AppBar position="static" className={classes.appBar} elevation={2}>
      <Toolbar variant="dense">
        <div className={classes.avatarContainer}>
          <ListItem
            className={classes.root}>
            <ListItemAvatar>
              <Avatar
                alt={props.selectedChat && props.selectedChat.userName}
                src={props.selectedChat && props.selectedChat.avatar}
                className={classes.large}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div style={{ display: 'flex' }}>
                    <Typography
                      className={classes.title}
                      variant="h6" noWrap
                      color="textPrimary"
                    >
                      {props.selectedChat && props.selectedChat.userName}
                    </Typography>
                  </div>
                </React.Fragment>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {props.selectedChat && props.selectedChat.online ? 'Online' : getTimeDisplay(props.selectedChat && props.selectedChat.lastOnline)}
                </Typography>
              }
            />
          </ListItem>
        </div>
        <div className={classes.search}>
          <IconButton className={classes.searchIcon}> {/* Workaround to get theming working; divs fail */}
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

        <IconButton aria-controls="fade-menu" aria-haspopup="true">
          <VideocamIcon />
        </IconButton>
        <IconButton aria-controls="fade-menu" aria-haspopup="true" className={classes.menuButton} onClick={handleCallClicked}>
          <CallIcon />
        </IconButton>
        <IconButton aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} className={classes.menuButton}>
          <MoreIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
          <MenuItem onClick={handleClose}>Clear Messages</MenuItem>
          <MenuItem onClick={handleClose}>Block/Exit</MenuItem>
        </Menu>
      </Toolbar>
      {/* <CallDialog user={props.selectedChat} open={openCallDialog} openDialog={setOpenCallDialog} onClose={closeCallModal} selectedChat={props.selectedChat}></CallDialog> */}
    </AppBar>
  );
}