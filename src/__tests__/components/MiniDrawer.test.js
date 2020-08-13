import React from 'react';

import { shallow } from 'enzyme';
import { List } from '@material-ui/core';
import { MiniDrawer } from "../../components/MiniDrawer/MiniDrawer";

describe('MiniDrawer Component', () => {
  test('Renders mini drawer on side', () => {
    const wrapper = shallow(<MiniDrawer />);
    expect(wrapper.find(List)).toHaveLength(2);
  });
});