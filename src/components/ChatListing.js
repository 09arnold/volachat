import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MessageInput from "./chat_window/MessageInput";
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import DoneAllIcon from '@material-ui/icons/DoneAll';

import { connect } from "react-redux";
import { selectInput, getPeerConnection } from "../redux/actions";

import { getTimeDisplay } from "../utils/Helpers";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer'
    },
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  avatar: {
    border: '1px solid',
    borderColor: theme.palette.action.selected,
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  inline: {
    display: 'inline',
  },
  onelineEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block'
  },
  threelineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  },
  checkMarks: {
    fontSize: '1rem',
    marginTop: '1rem',
    color: theme.palette.primary.light
  },
  chatRoot: {
    display: 'flex',
    width: '100%',
    '& .right': {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      '& .heading': {
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(3),
        margin: theme.spacing(.25),
        '& .icon': {
          marginLeft: 'auto',
          marginBottom: theme.spacing(.5),
        }
      },
      '& .body': {
        margin: theme.spacing(1.25, 0),
        maxWidth: '300px'
      },
    },
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(1),
    alignItems: 'center'
  }
}));

function ChatListing(props) {
  const messageInput = <MessageInput addMessage={props.addMessage} peerConnection={props.user.peerConnection} />;
  const classes = useStyles();

  const selectInput = () => {
    props.selectInput(messageInput);
  }

  let lastMessage = props.user.messages.length ? props.user.messages[props.user.messages.length - 1] : {};

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Card variant="outlined">
      <ListItem alignItems="flex-start"
        selected={props.selected}
        className={classes.root}
        onClick={selectInput}>
        {/* <ListItemAvatar>
          <Avatar className={classes.avatar} alt={props.user.userName} src={props.user.avatar || 'https://picsum.photos/200'} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <div style={{ display: 'flex' }}>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                  style={{ flexGrow: '1' }}
                >
                  {props.user.userName}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                  style={{ flexGrow: '0' }}
                >
                  {getTimeDisplay(props.user.lastOnline)}
                </Typography>
              </div>
            </React.Fragment>
          }
          secondary={
            <Tooltip title={lastMessage.text || ''} arrow>
              <span className={classes.onelineEllipsis}>
                {lastMessage.text || null}
                {lastMessage.source === 'local' ? <DoneAllIcon className={classes.checkMarks} /> : ''}
              </span>
            </Tooltip>
          }
        /> */}
        <div className={classes.chatRoot}>
          <div className={classes.left}>
            <Avatar className={classes.avatar} alt={props.user.userName} src={props.user.avatar || 'https://picsum.photos/200'} />
            {lastMessage?.source === 'local' && <DoneAllIcon className={classes.checkMarks} />}
          </div>
          <div className={`right`}>
            <div className={`heading`}>
              <Typography
                component="span"
                variant="subtitle2"
                color="textPrimary"
              >
                {props.user.userName}
              &nbsp;
              &bull;
              </Typography>
              &nbsp;
              <Typography
                component="span"
                variant="caption"
                color="textSecondary"
              >
                {getTimeDisplay(lastMessage.time)}
              </Typography>

              <IconButton aria-label="delete" aria-haspopup="true" onClick={handleClick} size="small" className={`icon`}>
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                // transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleClose}>Mute</MenuItem>
                <MenuItem onClick={handleClose}>Mark as read</MenuItem>
                <MenuItem onClick={handleClose}>Delete chat</MenuItem>
              </Menu>
            </div>
            <Divider />
            <div className={`body`}>
              <Typography
                component="span"
                variant="subtitle2"
                color="textPrimary"
              >
                <Tooltip title={lastMessage.text || ''} arrow>
                  <span className={classes.threelineEllipsis}>
                    {lastMessage.text || null}
                  </span>
                </Tooltip>
              </Typography>
            </div>
          </div>
        </div>
      </ListItem>{/* 
               */}
    </Card>
  );

}
const mapStateToProps = state => {
  return {
    renderCount: state.renderCount,
    chatList: state.chatList
  }
}
export default connect(mapStateToProps, {
  selectInput,
  getPeerConnection
})(ChatListing);