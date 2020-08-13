import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import MovieIcon from '@material-ui/icons/Movie';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import { connect } from "react-redux";
import { addMessage, selectIndex, triggerRender } from "../../redux/actions";
import { sendMessage } from "../../webrtc";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1,2),
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    flexDirection: 'column'
  },
  inputContainer: {
    display: 'flex',
    padding: theme.spacing(0, 0, 1, 2),
    alignItems: 'center'
  },
  input: {
    marginRight: theme.spacing(1),
    flexGrow: 1,
  },
  topBar: {
    padding: theme.spacing(.5, 1)
  },
  iconButton: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(0.5),
  },
}));

function MessageInput(props) {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <IconButton className={classes.iconButton} size="small">
          <EmojiEmotionsIcon fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton} size="small">
          <InsertDriveFileIcon fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton} size="small">
          <ImageIcon fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton} size="small">
          <MovieIcon fontSize="small" />
        </IconButton>
        <IconButton className={classes.iconButton} size="small">
          <LocationOnIcon fontSize="small" />
        </IconButton>
      </div>
      <div className={classes.inputContainer}>
        <InputBase
          multiline
          rowsMax="5"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={classes.input}
          placeholder="Say something...."
          inputProps={{ 'aria-label': 'say something....' }}
        />
        <Button variant="contained" disableElevation onClick={localSendMessage} style={{height: 'fit-content'}}>
          Send
        </Button>
      </div>
    </div>
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

export default connect(mapStateToProps, { addMessage, selectIndex, triggerRender })(MessageInput);