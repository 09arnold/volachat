import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Tooltip from '@material-ui/core/Tooltip';

import NewChat from '../utils/NewChat';

export default function NewChatMenuItem(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const newChatClicked = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <Tooltip title={'New Chat'}>
        <ListItem button style={{ flexGrow: "0" }} onClick={newChatClicked}>
          {/* <ListItemIcon><AddCircleIcon /></ListItemIcon> */}
          <ListItemIcon><AddCommentIcon style={{ transform: 'rotateY(180deg)'}}/></ListItemIcon>
          <ListItemText primary={'New Chat'} />
        </ListItem >
      </Tooltip>
      <NewChat open={modalOpen} closeModal={closeModal} />
    </>
  );
}