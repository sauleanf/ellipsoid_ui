import React from 'react';
import { shallow } from 'enzyme';
import { ClickPulse } from '../../../components/blocks';

describe('ClickPulse', () => {
  const x = 20;
  const y = 31;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ClickPulse x={x} y={y} />);
  });

  it('appears at the location specified by x and y props', () => {
    expect(wrapper.get(0).props.style).toEqual({
      left: x,
      top: y,
    });
  });
});
