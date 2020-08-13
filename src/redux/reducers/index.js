import { combineReducers } from "redux";

import { sortChatByLastMessage } from "../../utils/Helpers";
import { getPeerConnection } from "../../webrtc";
import AppStorage from "../../utils/app-storage";

const chatListsReducer = (chatList = AppStorage.getItem('chatList') || [], action) => {
  if (action.type === 'ADD_MESSAGE') {
    const { message, chatList, selectedIndex } = action.payload;
    chatList[selectedIndex].messages.push(message);
  }
  if (action.type === 'ADD_CHAT') {
    chatList.push(action.payload.chat);
  }
  if (action.type === 'SET_PEER_CONNECTION') {
    let { peerId, connection, chatList } = action.payload;
    const index = chatList.findIndex(chat => Number(chat.id) === Number(peerId));
    if (index > -1) {
      chatList[index].peerConnection = connection;
      chatList[index].online = true;
    }
  }
  if (action.type === 'PEER_OFFLINE') {
    let { peerId } = action.payload;
    const index = chatList.findIndex(chat => Number(chat.id) === Number(peerId));
    if (index > -1) {
      chatList[index].lastOnline = new Date().toLocaleString();
      chatList[index].online = false;
    }
  }
  return sortChatByLastMessage(chatList);
}

const selectedChat = (selectedChat = null, action) => {
  if (action.type === 'SELECT_CHAT') {
    return action.payload;
  }
  return selectedChat;
}

const selectedIndex = (index = null, action) => {
  if (action.type === 'SELECT_INDEX') {
    return action.payload
  }
  return index;
}

const selectedInput = (selectedInput = null, action) => {
  if (action.type === 'SELECT_INPUT') {
    return action.payload
  }
  return selectedInput;
}

const triggerRender = (renderCount = 0, action) => {
  if (action.type === 'TRIGGER_RENDER') {
    return action.payload + 1;
  }
  return renderCount;
}

const peerId = (id = AppStorage.getItem('peerId'), action) => {
  if (action.type === 'SET_PEER_ID') {
    return action.payload;
  }
  return id;
}

const userName = (userName = AppStorage.getItem('userName'), action) => {
  if (action.type === 'SET_USERNAME') {
    return action.payload;
  }
  return userName;
}

const peerConnection = async (peerConnection, action) => {
  if (action.type === 'GET_PEER_CONNECTION') {
    let { peerId, chatList } = action.payload;
    const index = chatList.findIndex(chat => chat.id === peerId);
    if (index > -1) {
      peerConnection = await getPeerConnection(peerId);
      chatList[index].peerConnection = peerConnection;
      return peerConnection;
    }
  }
  return peerConnection;
}

// const setPeerConnection = (action) => {
//   if (action.type === 'SET_PEER_CONNECTION') {
//     let { peerId, connection, chatList } = action.payload;
//     const index = chatList.findIndex(chat => chat.id == peerId);
//     if (index > -1) {
//       chatList[index].peerConnection = connection;
//     }
//   }
// }

const appTheme = (theme = 'light', action) => {
  if (action.type === 'SET_THEME') {
    return action.payload;
  }
  return theme;
}

export default combineReducers({
  selectedChat,
  selectedInput,
  chatList: chatListsReducer,
  selectedUserIndex: selectedIndex,
  renderCount: triggerRender,
  peerId,
  userName,
  peerConnection,
  appTheme
});