import React, { useState } from 'react';
import { connect } from "react-redux";

import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

import AppDialog from "./AppDialog";
import AppStorage from '../../utils/app-storage';
import { getPeerConnection } from "../../webrtc";
import { addChat, selectIndex, selectChat, triggerRender } from "../../redux/actions";

const NewMessage = function (props) {
  const [peerId, setPeerId] = useState('');
  let [conn, setConn] = useState();
  const volachat = AppStorage.getItem('volachat')

  const handlePeerIDChange = event => {
    setPeerId(event.target.value);
  }

  const connectPeer = async () => {
    console.log('Connecting to peer', peerId)
    conn = await getPeerConnection(peerId)
    setConn(conn);

    conn.on('open', () => {
      props.closeModal();
    })

  }

  const dialogButtons = [
    {
      label: 'Connect',
      action: connectPeer,
      primary: true
    }
  ];

  return (
    <AppDialog
      title='New Chat'
      open={props.open}
      handleClose={props.closeModal}
      maxWidth='sm'
      dialogButtons={dialogButtons}
    >
      <Typography>
        Enter the PeerID of the user you want to connect to
      </Typography>
      <TextField
        id="peerId"
        label="Peer ID"
        value={peerId}
        autoFocus
        onChange={handlePeerIDChange}
        helperText="The Peer ID of the user you want to chat with"
      />
    </AppDialog>
  );
}

const mapStateToProps = state => {
  return {
    chatList: state.chatList,
    selectedUserIndex: state.selectedUserIndex,
    selectedChat: state.selectedChat,
    renderCount: state.renderCount
  };
}

export default connect(mapStateToProps, { addChat, selectIndex, selectChat, triggerRender })(NewMessage);