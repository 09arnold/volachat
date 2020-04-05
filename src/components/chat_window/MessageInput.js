import React, { useEffect, useRef } from 'react';
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

export default function MessageInput(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const inputBaseRef = useRef();

  const handleKeyPress = event => {
    console.log(this)
    if (event.which === 13) {
      if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
        props.addMessage({
          text: event.target.value,
          time: new Date().toLocaleString(),
          source: 'local'
        });
        event.persist()
        setTimeout(function () {
          event.target.style = null;
          event.target.value = null;
        }, 0);
      }
    }
  };

  const handleChange = event => {
    setInputValue(event.target.value);
    // const val = event.target.value;
    // if (inputValue == '') {
    //   setInputValue(null);
    // }
    // event.persist()
    // setTimeout(() => {
    //   setInputValue(val);
    // }, 0);
  }

  const handleAttachmentClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(function() {
    console.log(inputBaseRef.current.value)
  });
  
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
          inputRef={inputBaseRef}
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
        <IconButton className={classes.iconButton} aria-label="directions">
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