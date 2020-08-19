
import { createStore } from "redux";
import reducers from "./reducers";
import AppStorage from "../utils/app-storage";

const persistedState = AppStorage.getAll();
const reduxStore = createStore(reducers, persistedState);

let initialRenderCount = reduxStore.getState().renderCount;
let debounceTimeoutId = 0;

reduxStore.subscribe(() => {
  clearTimeout(debounceTimeoutId)
  debounceTimeoutId = setTimeout(() => {
    updateAppStorage();
  }, 750);
});

const updateAppStorage = async () => {
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
}

export default reduxStore;