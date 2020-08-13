import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import ChatSearch from "./ChatSearch";

import './../App.css';
import { sortMessagesByTime } from "../utils/Helpers";
import { selectInput, selectIndex, selectChat } from "../redux/actions";

import ChatListing from "./ChatListing";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
    borderRight: `1px solid ${theme.palette.divider}`,
    '&> *:not(:first-child)': {
    },
  },
  chatListContainer: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2.5),
    padding: theme.spacing(0, 2, 2),
    overflow: 'auto',
    flexGrow: 1,
  },
  chatList: {
    marginBottom: theme.spacing(3),
    width: '100%',
    maxWidth: 360,
    minWidth: 360,
    position: 'relative',
    '& > *': {
      marginBottom: theme.spacing(2)
    }
  },
  inline: {
    display: 'inline',
  },
  fixtop: {
    position: 'absolute',
    top: '0px'
  }
}));

export function ChatList(props) {
  let searchTerm = '';
  const classes = useStyles();
  const [userList, setUserList] = React.useState(props.userList);
  const [userListDisplay, setUserListDisplay] = React.useState(props.userList);

  const handleListItemClick = (event, index, user) => {
    props.selectIndex(index);
    props.selectChat(props.userList[index]);
  };

  const getSearchTerm = (value) => {
    searchTerm = value;
    if (searchTerm) {
      setUserListDisplay(
        sortMessagesByTime(
          filteredUsers(searchTerm)
        )
      );
    } else {
      setUserListDisplay(
        sortMessagesByTime(props.userList)
      );
    }
  }

  const filteredUsers = (searchTerm) => {
    return userList.filter((user) => {
      return user.messages[user.messages.length - 1].text.toLowerCase().includes(searchTerm.toLowerCase()) || user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    })
  };

  const noChatToDisplay = () => {
    return (
      <div className={"chat-list-empty"}>
        <Typography
          component="span"
          variant="body2"
          color="textSecondary">
          No user or chat found
          </Typography>
      </div>
    )
  }

  const chatDisplay = (list) => {
    return list.map((user, index) => (
      <div
        key={user.id}
        selected={props.selectedIndex === index}
        onClick={event => handleListItemClick(event, index, user)}>

        <ChatListing
          user={user}
          selected={props.selectedIndex === index}
          key={index}
          selectInput={props.selectInput}
        />
      </div>
    ))
  }

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList, props.renderCount]);

  return (
    <div className={`${classes.root} scroll-area`}>
      <ChatSearch getSearchTerm={getSearchTerm} className={classes.iconButton}></ChatSearch>
      <Typography variant="h6" component="h6" color="textSecondary" style={{ margin: '18px 0' }}>
        Messages
      </Typography>
      <div className={classes.chatListContainer}>
        <List className={classes.chatList}>
          {userListDisplay.length ? chatDisplay(userListDisplay) : noChatToDisplay()}
        </List>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userList: state.chatList,
    selectedIndex: state.selectedUserIndex,
    renderCount: state.renderCount
  }
}

export default connect(mapStateToProps, {
  selectInput,
  selectIndex,
  selectChat
})(ChatList);