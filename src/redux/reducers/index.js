import { combineReducers } from "redux";

import { sortChatByLastMessage } from "../../utils/Helpers";
import { ChatListing } from "../../utils/SampleData";

const chatListsReducer = (chatList = ChatListing, action) => {
  if (action.type === 'GET_CHAT_LIST') {
    return chatList;
  }
  return chatList;
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

const addMessage = (chatList = ChatListing, action) => {
  if (action.type === 'ADD_MESSAGE') {
    const { message, chatList, selectedIndex } = action.payload;
    chatList[selectedIndex].messages.push(message);
    return sortChatByLastMessage(chatList);
  }
  return sortChatByLastMessage(chatList);
}

const triggerRender = (renderCount = 0, action) => {
  if (action.type === 'TRIGGER_RENDER') {
    return action.payload + 1;
  }
  return renderCount;
}

export default combineReducers({
  addMessage,
  selectedChat,
  selectedInput,
  chatList: chatListsReducer,
  selectedUserIndex: selectedIndex,
  renderCount: triggerRender
});