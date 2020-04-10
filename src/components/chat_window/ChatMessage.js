import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    marginBottom: theme.spacing(1.25),
    // backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
  },
  inline: {
    display: 'inline',
  },
  onelineEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block'
  },
  card: {
    borderBottomLeftRadius: '0px',
    borderRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2)
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.25),
    '&:last-child': {
      paddingBottom: theme.spacing(1)
    },
  },
  time: {
    alignSelf: 'flex-end',
  },
  localMessage: {
    alignSelf: 'flex-end',
    '& $card': {
      borderBottomLeftRadius: theme.spacing(2),
      borderBottomRightRadius: '0px',
    }
  },
}));

export default function ChatMessage(props) {
  const classes = useStyles();

  const message = {};

  const { text, time, source } = props && props.message ? props.message : {};
  message.text = text || 'N/A';
  message.time = time || new Date().toLocaleTimeString();
  message.source = source || 'remote'; //Remote or local, properize this later

  return (
    <div className={`${classes.root} ${message.source === 'local' ? classes.localMessage : ''}`}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            display="block"
            variant="body2"
            color="textPrimary"
          >
            {message.text && message.text}
          </Typography>
          <Typography
            display="block"
            variant="caption"
            color="textSecondary"
            className={classes.time}
          >
            {message.time && new Date(message.time).toLocaleTimeString()}
          </Typography>
        </CardContent>
      </Card>

      {/* <div>{message.text && message.text}</div>
      <div>{message.time && message.time}</div> */}
    </div>
  );
}