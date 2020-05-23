import AppStorage from "./app-storage";

const localUserName = AppStorage.getItem('userName') || null;
// const peerId = AppStorage.getItem('peerId') || null;
const localAvatar = AppStorage.getItem('localAvatar') || null;

const MessageTypes = Object.freeze({
  TEXT: 'TEXT',
  CONNECTION: 'CONNECTION',
  FILE: 'FILE',
  IMAGE: 'IMAGE',
  AUDIOE: 'AUDIO',
  VIDEO_CALL: 'VIDEO_CALL',
  VOICE_CALL: 'VOICE_CALL',
  LOCATION: 'LOCATION'
});

const BaseMessage = () => {
  return {
    source: 'remote',
    type: MessageTypes.TEXT,
    userName: localUserName,
    time: new Date().toLocaleString(),
  }
}

const TextMessage = (peerId, userName, text, avatar) => {
  return {
    ...(BaseMessage()),
    userName,
    id: peerId,
    text,
    avatar
  }
}

const ConnectionMessage = (connection, id) => {
  return {
    type: MessageTypes.CONNECTION,
    id: id,
    userName: localUserName,
    avatar: localAvatar || 'https://picsum.photos/200',
    messages: [],
    lastOnline: new Date().toLocaleString(),
  }
}

const CreateMessage = (data) => {
  let message = null;
  switch (data.type) {
    case 'TEXT':
      message = TextMessage(data.id, data.userName, data.text, data.avatar);
      break;
    case 'CONNECTION':
      message = data
      break;
    default:
      break;
  }
  return message;
}

const CreateChat = (empty, message, connection) => {
  const chat = {
    peerConnection: connection,
    avatar: message.avatar,
    id: empty ? connection.peer : parseInt(message.id),
    lastOnline: new Date().toLocaleString(),
    userName: message.userName,
    messages: empty ? [] : [message]
  }
  return chat;
}

export {
  MessageTypes,
  TextMessage,
  ConnectionMessage,
  CreateMessage,
  CreateChat
}