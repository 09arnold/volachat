import Peer from "peerjs";

import AppStorage from "../utils/app-storage";
import { ConnectionMessage, TextMessage, CreateMessage, CreateChat } from "../utils/MessageHelpers";
import { addChat, triggerRender, addMessage, setPeerConnection, peerOffline } from "../redux/actions";
import reduxStore from '../redux/store';

const localPeerId = AppStorage.getItem('peerId');
const userName = AppStorage.getItem('userName');

let RTCPeer = null;

const setupPeer = async () => {
  if (localPeerId) {
    console.log(`Setting up local peer with id ${localPeerId}`);
    RTCPeer = await new Peer(localPeerId, {
      host: '192.168.8.107',
      port: 9000,
      path: '/volachat'
    });

    RTCPeer.on('connection', function (conn) {
      console.info('Someone connected!', conn.peer);

      conn.on('open', () => {
        console.info(`Connected to peer [${conn.peer}]`, 'RTCPeer');
        let connMessage = ConnectionMessage(conn, localPeerId);
        conn.send(JSON.stringify(connMessage));
      })

      conn.on('data', function (data) {
        console.info(`DATA RECEIVED`, JSON.parse(data), 'RTCPeer');
        dataReceived(data, conn);
      });

      conn.on('close', (data) => {
        console.log(conn.peer + ' lost', 'RTCPeer');
      });

      conn.on('error', (error) => {
        console.log(conn.peer + ' error', error, 'RTCPeer');
      });
    });

    window.Peer = RTCPeer;
    window.PeerJS = Peer;

    return RTCPeer;
  }
}

(async () => {
  RTCPeer = await setupPeer();
})();

const getPeerConnection = async (peerId) => {
  if (!RTCPeer || RTCPeer.destroyed) {
    RTCPeer = null;
    RTCPeer = await setupPeer();
  }

  console.log('Connecting to peer', peerId, 'RTCPeer')
  const conn = await RTCPeer.connect(peerId);

  conn.on('open', (data) => {
    console.info(`Connected to peer [${conn.peer}]`, 'getPeerConnection');
  })

  conn.on('data', function (data) {
    console.log(`DATA RECEIVED`, JSON.parse(data));
    dataReceived(data, conn);
  });

  conn.on('close', (data) => {
    console.log(conn.peer + ' lost');
    reduxStore.dispatch(
      peerOffline(conn.peer)
    )
  });

  conn.on('error', (error) => {
    console.log(conn.peer + ' error', error);
  });
  return conn;
}

const sendMessage = async (conn, message, id) => {
  if (!conn || !conn.open) {
    conn = null;
    conn = await getPeerConnection(id);

    conn.on('open', () => {
      conn.send(
        JSON.stringify(
          TextMessage(localPeerId, userName, message, "https://picsum.photos/200")
        )
      )
    });

    reduxStore.dispatch(
      setPeerConnection(id, conn, reduxStore.getState().chatList)
    );

    return conn;
  } else {
    conn.send(
      JSON.stringify(
        TextMessage(localPeerId, userName, message, "https://picsum.photos/200")
      )
    )
  }

};

const dataReceived = (data, connection) => {
  data = JSON.parse(data);
  console.info(connection, data)

  let chat = undefined;
  const index = reduxStore.getState().chatList.findIndex(chat => chat.id == data.id);
  const message = CreateMessage(data);

  if (index < 0) {
    chat = CreateChat(data.type === 'CONNECTION', message, connection);
    reduxStore.dispatch(
      addChat(reduxStore.getState().chatList, chat)
    );
  } else if (data.type !== 'CONNECTION') {
    reduxStore.dispatch(
      addMessage(message, reduxStore.getState().chatList, index)
    );
  }
  reduxStore.dispatch(
    triggerRender(reduxStore.getState().renderCount)
  );
  console.info(reduxStore.getState(), chat || data);
}

export {
  sendMessage,
  getPeerConnection
};

export default RTCPeer;