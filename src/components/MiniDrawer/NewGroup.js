import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Tooltip from '@material-ui/core/Tooltip';

export default function NewGroup(props) {
  return (
    <Tooltip title={'New Group'}>
      < ListItem button style={{ flexGrow: "0" }} disabled>
        <ListItemIcon><GroupAddIcon /></ListItemIcon>
        <ListItemText primary={'New Group'} />
      </ListItem >
    </Tooltip>
  )
}