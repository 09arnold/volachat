import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// import './App.css';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import ChatList from './components/ChatList';
import ChatWindow from './components/chat_window/ChatWindow';
import AppStorage from './utils/app-storage';
import { connect } from 'react-redux';
import CallDialog from './components/call_dialog';
import { getLocalPeer } from './webrtc';

class App extends React.Component {

  constructor(props) {
    super();
    this.lightTheme = createMuiTheme({
      palette: {
        type: 'light',
      },
    })
    this.darkTheme = createMuiTheme({
      palette: {
        type: 'dark',
      },
    });
    this.state = {
      theme: AppStorage.getItem('appTheme') === 'dark' ? this.darkTheme : this.lightTheme,
      incomingCaller: null,
      openCallDialog: false
    };

    if (!this.RTCPeer) {
      (async () => {
        this.RTCPeer = await getLocalPeer();
        if (this.RTCPeer)
          this.RTCPeer.on('call', incomingCall => {
            // props.openDialog(true);
            // setCallSnackbarOpen(true);
            const chat = props.chatList.find(chat => chat.id == incomingCall.peer);
            this.setState({ incomingCaller: chat })
            console.log('Call ooo....', chat, incomingCall)
          })
      })();
    }
  }

  toggleTheme = theme => {
    this.setState({ theme: theme === 'dark' ? this.darkTheme : this.lightTheme });
  }

  componentDidUpdate = (newProps, someProps) => {
    // if (newProps.appTheme !== this.state.theme.palette.type) {
    //   console.log(newProps, someProps);
    //   this.setState({ theme: newProps.appTheme === 'dark' ? this.darkTheme : this.lightTheme });
    // }
    console.log(newProps, someProps)
  }

  closeCallModal = () => {
    this.setState({ openCallDialog: false })
  }
  openCallDialog = () => {
    this.setState({ openCallDialog: true })
  }
  closeCallDialog = () => {
    this.setState({ openCallDialog: false })
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme} >
        <div className="root main">
          <MiniDrawer toggleTheme={this.toggleTheme} />
          <div className={"chat-list"}>
            <ChatList className={"chatlist"} />
          </div>
          <div className={"chat-window"}>
            <ChatWindow theme={this.state.theme} openCallDialog={this.openCallDialog} />
          </div>
        </div>
        <CallDialog
          user={this.state.selectedChat || this.props.selectedChat}
          incomingCaller={this.state.incomingCaller}
          open={this.state.openCallDialog}
          closeCallDialog={this.closeCallDialog}
          openCallDialog={this.openCallDialog}
        />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme,
    selectedChat: state.selectedChat,
    chatList: state.chatList
  }
}

export { App };

export default connect(mapStateToProps)(App);