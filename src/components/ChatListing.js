import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MessageInput from "./chat_window/MessageInput";

import { connect } from "react-redux";
import { selectInput } from "../redux/actions";

import { getTimeDisplay } from "../utils/Helpers";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer'
    }
  },
  avatar: {
    border: '1px solid',
    borderColor: theme.palette.action.selected,
  },
  inline: {
    display: 'inline',
  },
  onelineEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block'
  }
}));

function ChatListing(props) {
  const messageInput = <MessageInput addMessage={props.addMessage} />;
  const classes = useStyles();

  const selectInput = () => {
    props.selectInput(messageInput);
  }

  let lastMessage = props.user.messages.length ? props.user.messages[props.user.messages.length - 1] : {};

  useEffect(() => {
    // console.log(messageInput.inputValue);
    // console.log(messageInput);
  }, [props.renderCount])

  return (
    <ListItem alignItems="flex-start"
      selected={props.selected}
      className={classes.root}
      onClick={selectInput}>
      <ListItemAvatar>
        <Avatar className={classes.avatar} alt={props.user.userName} src={props.user.avatar.src} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <div style={{ display: 'flex' }}>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
                style={{ flexGrow: '1' }}
              >
                {props.user.userName}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
                style={{ flexGrow: '0' }}
              >
                {getTimeDisplay(props.user.messages[props.user.messages.length - 1].time)}
              </Typography>
            </div>
          </React.Fragment>
        }
        secondary={
          <Tooltip title={lastMessage.text} arrow>
            <span className={classes.onelineEllipsis}>
              {lastMessage.text}
            </span>
          </Tooltip>
        }
      />
    </ListItem>
  );

}
const mapStateToProps = state => {
  return {
    renderCount: state.renderCount
  }
}
export default connect(mapStateToProps, {selectInput})(ChatListing);