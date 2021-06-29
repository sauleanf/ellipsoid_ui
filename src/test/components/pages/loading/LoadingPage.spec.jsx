import React from 'react';
import { mount } from 'enzyme';

import LoadingPage from '../../../../components/pages/loading/LoadingPage';
import { Icon } from '../../../../components/blocks';

describe('LoadingPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LoadingPage />);
  });

  it('renders an icon', () => {
    expect(wrapper.find(Icon).exists()).toBe(true);
  });
});
