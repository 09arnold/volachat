import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, .75),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  focused: {
    backgroundColor: theme.palette.action.hover,
  }
}));

export default function ChatSearch(props) {

  const classes = useStyles();
  const [focused, setFocused] = useState(false);

  return (
    <div className={`${classes.root} ${focused && classes.focused}`}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onChange={event => { props.getSearchTerm(event.currentTarget.value) }}
        onFocus={event => setFocused(true)}
        onBlur={event => setFocused(false)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
}
