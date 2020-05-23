import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StarIcon from "@material-ui/icons/Star";
import Tooltip from '@material-ui/core/Tooltip';

export default function StarredMessages(props) {


  return (
    <Tooltip title={'Starred Messages'}>
      < ListItem button style={{ flexGrow: "0" }}>
        <ListItemIcon><StarIcon /></ListItemIcon>
        <ListItemText primary={'Starred Messages'} />
      </ListItem >
    </Tooltip>
  )
}