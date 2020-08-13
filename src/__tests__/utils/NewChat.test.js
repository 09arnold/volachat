import React from 'react';

import configureStore from 'redux-mock-store';
import { Provider, connect } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { TextField, Button } from '@material-ui/core';
import NewChat from "../../components/utils/NewChat";
import AppStorage from '../../utils/app-storage';
import { ChatListing } from "../../utils/SampleData";

describe('NewChat Component', () => {

  const state = {
    chatList: ChatListing,
    appTheme: 'light',
    peerId: 1000000,
    userName: 'John Doe',
    localAvatar: ''
  };

  const props = {
    connectPeer: jest.fn()
  }

  const mockStore = configureStore();
  const store = mockStore(state);

  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line react/jsx-filename-extension
    wrapper = mount(
      <Provider store={store}>
        <NewChat open={true}/>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('Renders NewChat Component', () => {
    expect(wrapper.find(TextField).length).toEqual(1);
  });

  test('Calls connectPeer function', () => {
    // wrapper.find('.MuiButton-containedPrimary > span.MuiButton-label').simulate('click');
    // expect(wrapper.find(NewChat).connectPeer).toHaveBeenCalled();
    console.log(wrapper.find(NewChat).peerId);
    
  });
});