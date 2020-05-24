import React from 'react';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import App from '../App';
import { ChatListing } from "../utils/SampleData";

describe('App Component', () => {
  const state = {
    chatList: ChatListing,
    appTheme: 'light',
    peerId: 1000000,
    userName: 'John Doe',
    localAvatar: ''
  };

  const mockStore = configureStore();
  const store = mockStore(state);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  it('renders App page', () => {
    expect(wrapper.find('.root.main').length).toEqual(1);
  });
});
