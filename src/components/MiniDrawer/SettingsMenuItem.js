import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from '@material-ui/core/Tooltip';

import AppSettings from "../AppSettings";
import WelcomeDialog from "../WelcomeDialog";
import AppStorage from '../../utils/app-storage';

export default function SettingsMenuItem(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  const settingsClicked = () => {
    setModalOpen(true);
  }

  const closeSettingsModal = () => {
    setModalOpen(false);
  }
  const closeWelcomeModal = () => {
    setWelcomeOpen(false);
  }

  let peerId = AppStorage.getItem('peerId');
  if (!welcomeOpen && !peerId) {
    setTimeout(() => {
      setWelcomeOpen(true);
    }, 0);
  }

  return (
    <>
      <Tooltip title={'Settings'}>
        <ListItem button style={{ flexGrow: "0" }} onClick={settingsClicked}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem >
      </Tooltip>
      <AppSettings open={modalOpen} close={closeSettingsModal} title='Settings' />
      <WelcomeDialog open={welcomeOpen} closeModal={closeWelcomeModal} />
    </>
  );
}