
import { createStore } from "redux";
import reducers from "./reducers";
import AppStorage from "../utils/app-storage";

const persistedState = AppStorage.getAll();
const reduxStore = createStore(reducers, persistedState)

let initialRenderCount = reduxStore.getState().renderCount

reduxStore.subscribe(() => {
  if (initialRenderCount !== reduxStore.getState().renderCount) {
    let tempList = reduxStore.getState().chatList.map((chat, index) => {
      let newChat = { ...chat }
      delete newChat.peerConnection
      return newChat;
    });
    AppStorage.setItem('chatList', tempList);
    initialRenderCount = reduxStore.getState().renderCount;
  }
  AppStorage.setItem('appTheme', reduxStore.getState().appTheme);
});

export default reduxStore;