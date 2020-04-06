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
    width: '100%',
    maxWidth: 360,
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    height: 'calc(100vh - 49px)',
    overflow: 'auto',
    padding: '0px',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  inline: {
    display: 'inline',
  },
  fixtop: {
    position: 'absolute',
    top: '0px'
  }
}));

function ChatList(props) {
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

        {(() => {
          if (index !== userList.length - 1) {
            return <Divider variant="inset" component="li" />
          }
        })()}
      </div>
    ))
  }

  useEffect(() => {
    setUserList(props.userList);
  }, [props.userList, props.triggerRender]);

  return (
    <div>
      <ChatSearch getSearchTerm={getSearchTerm} className={classes.iconButton}></ChatSearch>
      <Divider variant="middle"></Divider>
      <List className={`${classes.root} scroller`}>
        {userListDisplay.length ? chatDisplay(userListDisplay) : noChatToDisplay()}
      </List>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userList: state.chatList,
    selectedIndex: state.selectedUserIndex,
    triggerRender: state.triggerRender
  }
}

export default connect(mapStateToProps, {
  selectInput,
  selectIndex,
  selectChat
})(ChatList);