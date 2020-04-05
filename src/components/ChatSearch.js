import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '2px 4px',
    padding: theme.spacing(.25, .5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  // divider: {
  //   height: 28,
  //   margin: 4,
  // },
}));

export default function ChatSearch(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search chat..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={event => { props.getSearchTerm(event.currentTarget.value) }}
      />
    </div>
  );
}
