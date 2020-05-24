import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import ChatList from './components/ChatList';
import ChatWindow from './components/chat_window/ChatWindow';
import AppStorage from './utils/app-storage';
import { connect } from 'react-redux';

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
      theme: AppStorage.getItem('appTheme') === 'light' ? this.lightTheme : this.darkTheme,
    };
  }

  toggleTheme = theme => {
    this.setState({ theme: theme === 'dark' ? this.darkTheme : this.lightTheme });
  }

  componentDidUpdate = (newProps, someProps) => {
    // if (newProps.appTheme !== this.state.theme.palette.type) {
    //   console.log(newProps, someProps);
    //   this.setState({ theme: newProps.appTheme === 'dark' ? this.darkTheme : this.lightTheme });
    // }
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
            <ChatWindow theme={this.state.theme} />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme
  }
}

export { App };

export default connect(mapStateToProps)(App);