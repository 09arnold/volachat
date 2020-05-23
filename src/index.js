import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";

// import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers from "./redux/reducers";
import AppStorage from "./utils/app-storage";

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

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

export {
  reduxStore
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
