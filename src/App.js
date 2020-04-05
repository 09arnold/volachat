import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import MiniDrawer from './components/MiniDrawer';
import ChatList from './components/ChatList';
import ChatWindow from './components/chat_window/ChatWindow';
import * as Data from "./utils/SampleData";
import { sortChatByLastMessage } from "./utils/Helpers";

class App extends React.Component {

  constructor() {
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
      theme: this.lightTheme,
      userList: sortChatByLastMessage(Data.ChatListing || [])
    };

  }

  toggleTheme = (theme) => {
    if (theme === 'dark') {
      this.setState({ theme: this.darkTheme }, () => {
        console.log(theme, this.state)
      });
    } else {
      this.setState({ theme: this.lightTheme }, () => {
        console.log(theme, this.state)
      });
    }
    console.log(this.prefersDarkMode, theme)
  }

  selectChat = (user) => {
    this.setState({ selectedChat: user });
  }

  selectInput = (mInput) => {
    this.setState({ messageInput: mInput }, () => { console.log(mInput) });
  }

  setUserList = (userList) => {
    this.setState({ userList: userList });
  }

  addMessage = (message) => {
    const userList = this.state.userList;
    userList[this.state.selectedUserIndex].messages.push(message);
    this.setState({
      userList: sortChatByLastMessage(userList),
      selectedUserIndex: 0
    });
  }

  setSelectedUserIndex = (index) => {
    this.setState({ selectedUserIndex: index });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme} >
        <div className="root">
          <MiniDrawer toggleTheme={this.toggleTheme} />
          <div className={"chat-list"}>
            <ChatList className={"chatlist"}
              selectChat={this.selectChat}
              selectInput={this.selectInput}
              selectedIndex={this.state.selectedUserIndex}
              setSelectedUserIndex={this.setSelectedUserIndex}
              userList={this.state.userList}
              addMessage={this.addMessage}>
            </ChatList>
          </div>
          <div className={"chat-window"}>
            <ChatWindow
              selectedChat={this.state.selectedChat}
              theme={this.state.theme}
              messageInput={this.state.messageInput}
              setUserList={this.setUserList}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;