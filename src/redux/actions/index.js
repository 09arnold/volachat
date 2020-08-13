export const selectChat = user => {
  return {
    type: 'SELECT_CHAT',
    payload: user
  }
}

export const selectInput = input => {
  return {
    type: 'SELECT_INPUT',
    payload: input
  }
}

export const selectIndex = index => {
  return {
    type: 'SELECT_INDEX',
    payload: index
  }
}

export const addMessage = (message, chatList, selectedIndex) => {
  return {
    type: 'ADD_MESSAGE',
    payload: { message, chatList, selectedIndex }
  }
}

export const getChatList = () => {
  return {
    type: 'GET_CHAT_LIST'
  }
}

export const triggerRender = (renderCount = 0) => {
  return {
    type: 'TRIGGER_RENDER',
    payload: renderCount
  }
}

export const addChat = (chatList, chat) => {
  return {
    type: 'ADD_CHAT',
    payload: { chatList, chat }
  }
}

export const setPeerId = (id) => {
  return {
    type: 'SET_PEER_ID',
    payload: Number(id)
  }
}

export const setUserName = (userName) => {
  return {
    type: 'SET_USERNAME',
    payload: userName
  }
}

export const getPeerConnection = (peerId, chatList) => {
  return {
    type: 'GET_PEER_CONNECTION',
    payload: { peerId: Number(peerId), chatList }
  }
}

export const setPeerConnection = (peerId, connection, chatList) => {
  return {
    type: 'SET_PEER_CONNECTION',
    payload: { peerId: Number(peerId), connection, chatList }
  }
}

export const peerOffline = (peerId, chatList) => {
  return {
    type: 'PEER_OFFLINE',
    payload: { peerId: Number(peerId), chatList }
  }
}

export const setTheme = (theme) => {
  return {
    type: 'SET_THEME',
    payload: theme
  }
}