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