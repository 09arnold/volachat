import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { selectChat, addChat, triggerRender, selectIndex } from "../../redux/actions";

import './../../App.css';
import logo from './../../logo.svg';

import ChatWindowHeader from "./ChatWindowHeader";
import ChatMessage from "./ChatMessage";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
    // position: 'relative'
  },
  containerParent: {
  },
  containerBG: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  messagesContainer: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(2),
    backgroundImage: `url(img/bg2.png)`,
    position: 'relative',
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
  },
  messageInputDivider: {
    backgroundColor: theme.palette.divider
  }
}));

export function ChatWindow(props) {
  const classes = useStyles();
  const [chatMessages, setChatMessages] = useState([]);
  const msgContatinerEl = useRef(null);

  const noChatSelected = (
    <header className={`${classes.noChatSelected}`}>
      <div className={`${classes.noChatSelectedBG} ${props.theme.palette.type === 'dark' && classes.darkBG}`}></div>
      <img src={logo} className="App-logo" alt="logo" />
      <Typography variant="body1" color="textPrimary">
        <em>Messages are transmitted directly between users. No servers involved!</em>
      </Typography>
    </header>
  );

  const [listening, setListening] = React.useState(false);

  // Set up event source to listen for updates from the server
  // React.useEffect(() => {
  //   if (!listening) {
  //     const events = new EventSource('http://192.168.8.107:9000/sse');

  //     events.addEventListener('seating-update', function (message) {
  //       console.log(message);
  //     });
  //     console.log(events)
  //     events.onmessage = function (message) {
  //       console.log(message);
  //     };

  //     setListening(true);
  //   }
  // }, [listening]);

  const chatView = (
    <div className={classes.root}>
      <ChatWindowHeader selectedChat={props.selectedChat} openCallDialog={props.openCallDialog}></ChatWindowHeader>
      <div className={`${classes.containerParent} ${classes.messagesContainer} scroller ${props.theme.palette.type === 'dark' && classes.darkBG}`} ref={msgContatinerEl}>
        {chatMessages.map((message, index) => (
          <ChatMessage message={message} key={index} />
        ))}
      </div>
      <Divider className={classes.messageInputDivider} />
      {props.messageInput}
    </div>
  );

  useEffect(() => {
    if (props.selectedChat) {
      setChatMessages(props.selectedChat.messages);
      setTimeout(() => {
        msgContatinerEl.current.scrollTop = msgContatinerEl.current.scrollHeight;
      }, 0);
    }
  }, [props.selectedChat, props.renderCount]);

  return (
    <>{props.selectedChat ? chatView : noChatSelected}</>
  );
}

const mapStateToProps = state => {
  return {
    selectedChat: state.selectedChat ? { ...state.selectedChat } : state.selectedChat,
    messageInput: state.selectedInput,
    triggerRender: state.renderCount,
    chatList: state.chatList,
    renderCount: state.renderCount
  }
};

export default connect(mapStateToProps, {
  selectChat,
  addChat,
  triggerRender,
  selectIndex
}
)(ChatWindow);