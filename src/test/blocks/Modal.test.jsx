import React from 'react';
import {
  mount,
  shallow,
} from 'enzyme';
import { Modal } from '../../blocks';

describe('Modal', () => {
  let wrapper;
  let onCloseSpy;
  let isOpen;
  const childComponent = <p> test </p>;

  beforeEach(() => {
    isOpen = true;
    onCloseSpy = jest.fn((e) => e);
    wrapper = mount(
      <Modal isOpen={isOpen} onClose={onCloseSpy}>
        {childComponent}
      </Modal>,
    );
  });

  it('triggers the on close prop when clicked', () => {
    wrapper.find('.modal-footer-container button').simulate('click');
    expect(onCloseSpy).toBeCalled();
  });

  it('renders children', () => {
    expect(wrapper.containsMatchingElement(childComponent)).toEqual(true);
  });

  it('hides when isOpen is false', () => {
    const nullWrapper = shallow(<Modal isOpen={false} />);
    expect(nullWrapper.get(0)).toBeFalsy();
  });
});
