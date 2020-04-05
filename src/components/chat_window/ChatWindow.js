import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import './../../App.css';
import logo from './../../logo.svg';

import ChatWindowHeader from "./ChatWindowHeader";
// import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  },
  containerParent: {
    height: '100%',

    position: 'relative',
  },
  containerBG: {
    backgroundImage: `url(img/bg2.png)`,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  messagesContainer: {
    flexGrow: '1',
    overflow: 'auto',
    margin: '10px 0 70px',
    padding: '10px 15px 0',
    flexDirection: 'column',
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: 'calc(100% - 80px)'
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  noChatSelected: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundImage: 'url(img/bg1.png)',
    // transition: 'all .1s ease-in'
  },
  noChatSelectedBG: {
    backgroundImage: `url(img/bg1.png)`,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '-1'
  },
  darkBG: {
    filter: 'invert(80%)',
    '-webkitFilter': 'invert(80%)'
  }
}));

export default function ChatWindow(props) {
  const classes = useStyles();
  const [chatMessages, setChatMessages] = useState([]);
  const [fake, setFake] = useState(0);
  const msgContatinerEl = useRef(null);

  // const addMessage = (message) => {
  //   setChatMessages(props.selectedChat.messages);
  //   setFake(fake + 1);
  //   props.addMessage(message);

  //   setTimeout(() => {
  //     msgContatinerEl.current.scrollTop = msgContatinerEl.current.scrollHeight;
  //   }, 0);
  // }

  const noChatSelected = (
    <header className={`${classes.noChatSelected}`}>
      <div className={`${classes.noChatSelectedBG} ${props.theme.palette.type === 'dark' && classes.darkBG}`}></div>
      <img src={logo} className="App-logo" alt="logo" />
      <Typography variant="body1" color="textPrimary">
        <em>Messages are transmitted directly between users. No servers involved!</em>
      </Typography>
    </header>
  );

  const chatView = (
    <div className={classes.root}>
      <ChatWindowHeader selectedChat={props.selectedChat}></ChatWindowHeader>
      <div className={`${classes.containerParent}`}>
        <div className={`${classes.containerBG} ${props.theme.palette.type === 'dark' && classes.darkBG}`}></div>
        <div className={`${classes.messagesContainer} scroller`} ref={msgContatinerEl}>
          {chatMessages.map((message, index) => (
            <ChatMessage message={message} key={index} />
          ))}
        </div>
      </div>
      {/* <MessageInput addMessage={addMessage} selectedChat={props.selectedChat}></MessageInput> */}
      {props.messageInput}
    </div>
  );

  useEffect(() => {
    if (props.selectedChat) {
      // props.messageInput.addMessage = addMessage;
      console.log('Chat selected', props.selectedChat);
      // sort by time

      // set chat messages
      setChatMessages(props.selectedChat.messages);
      // scroll to bottom
      setTimeout(() => {
        msgContatinerEl.current.scrollTop = msgContatinerEl.current.scrollHeight;
      }, 0);

    }
  }, [props.selectedChat]);

  return (
    <>{props.selectedChat ? chatView : noChatSelected}</>
  );
}