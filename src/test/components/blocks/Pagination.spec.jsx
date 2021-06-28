import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from '../../../components/blocks';

describe('Pagination', () => {
  const page = 2;
  const pages = 4;
  let wrapper;
  let onChangeSpy;
  const value = 4;

  beforeEach(() => {
    onChangeSpy = jest.fn((e) => e);
    wrapper = shallow(<Pagination page={page} pages={pages} onChange={onChangeSpy} />);
  });

  it('changes the current state when input is changed', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    });
    expect(wrapper.state().current).toEqual(value);
  });

  it('calls the spy on blur', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    });
    wrapper.find('input').simulate('blur');
    expect(onChangeSpy).toBeCalledWith(value);
  });

  describe('previous button', () => {
    it('calls the spy with the previous page', () => {
      wrapper.find('.pagination-btn').at(0).simulate('click');
      expect(onChangeSpy).toBeCalledWith(1);
    });

    it('handles the lower bound', () => {
      wrapper.find('.pagination-btn').at(0).simulate('click');
      wrapper.find('.pagination-btn').at(0).simulate('click');
      expect(onChangeSpy).toBeCalledWith(1);
    });
  });

  describe('next button', () => {
    it('calls the spy with the next page', () => {
      wrapper.find('.pagination-btn').at(1).simulate('click');
      expect(onChangeSpy).toBeCalledWith(3);
    });

    it('handles the upper bound', () => {
      wrapper.find('.pagination-btn').at(1).simulate('click');
      wrapper.find('.pagination-btn').at(1).simulate('click');
      wrapper.find('.pagination-btn').at(1).simulate('click');
      expect(onChangeSpy).toBeCalledWith(4);
    });
  });
});
