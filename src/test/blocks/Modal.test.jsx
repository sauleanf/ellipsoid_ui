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

  describe('close button', () => {
    it('triggers the on close prop', () => {
      wrapper.find('.modal-close-btn').simulate('click');
      expect(onCloseSpy).toBeCalled();
    });
  });

  describe('background', () => {
    it('triggers the on close prop', () => {
      wrapper.find('.modal-container').simulate('click');
      expect(onCloseSpy).toBeCalled();
    });
  });

  describe('modal box', () => {
    it('does not triggers the on close prop', () => {
      wrapper.find('.modal-box').simulate('click');
      expect(onCloseSpy).not.toBeCalled();
    });
  });

  it('renders children', () => {
    expect(wrapper.containsMatchingElement(childComponent)).toEqual(true);
  });

  it('hides when isOpen is false', () => {
    const nullWrapper = shallow(<Modal isOpen={false} />);
    expect(nullWrapper.get(0)).toBeFalsy();
  });
});
