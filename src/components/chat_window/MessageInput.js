import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from "react-redux";
import { addMessage, selectIndex, selectChat, triggerRender } from "../../redux/actions";
import { sendMessage } from "../../webrtc";

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    margin: '15px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '25px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    left: '0'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function MessageInput(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyPress = event => {
    if (event.which === 13 && !event.ctrlKey && !event.altKey && !event.shiftKey) {
      localSendMessage();
    }
  };

  const localSendMessage = () => {
    if (!inputValue.trim()) return;

    props.addMessage({
      text: inputValue,
      time: new Date().toLocaleString(),
      source: 'local'
    }, props.chatList, props.selectedUserIndex);
    props.selectIndex(0);
    props.triggerRender(props.renderCount);

    setTimeout(() => {
      sendMessage(props.peerConnection, inputValue, props.selectedChat.id);
    }, 0);

    setTimeout(function () {
      setInputValue('');
    }, 0);
  }

  const handleChange = event => {
    setInputValue(event.target.value);
  }

  const handleAttachmentClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <EmojiEmotionsIcon />
        </IconButton>
        <InputBase
          multiline
          rowsMax="4"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={classes.input}
          placeholder="Say something...."
          inputProps={{ 'aria-label': 'say something....' }}
        />
        <IconButton className={classes.iconButton}
          aria-label="send"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleAttachmentClick}>
          <AttachFileIcon />
        </IconButton>

        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="directions" onClick={localSendMessage}>
          <SendIcon />
        </IconButton>
      </Paper>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Image</MenuItem>
        <MenuItem onClick={handleClose}>Audio</MenuItem>
        <MenuItem onClick={handleClose}>File</MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = state => {
  return {
    chatList: state.chatList,
    selectedUserIndex: state.selectedUserIndex,
    selectedChat: state.selectedChat,
    renderCount: state.renderCount,
    peerConnection: state.selectedChat.peerConnection
  };
}

export default connect(mapStateToProps, { addMessage, selectIndex, selectChat, triggerRender })(MessageInput);