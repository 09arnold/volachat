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

  setUserList = (userList) => {
    this.setState({ userList: userList });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme} >
        <div className="root">
          <MiniDrawer toggleTheme={this.toggleTheme} />
          <div className={"chat-list"}>
            <ChatList className={"chatlist"}>
            </ChatList>
          </div>
          <div className={"chat-window"}>
            <ChatWindow
              theme={this.state.theme}
            // setUserList={this.setUserList}
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;