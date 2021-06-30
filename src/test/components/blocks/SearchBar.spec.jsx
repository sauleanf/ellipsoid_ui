import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from '../../../components/blocks';

describe('SearchBar', () => {
  let wrapper;
  let filterSpy;
  const value = 4;

  beforeEach(() => {
    filterSpy = jest.fn((e) => e);
    wrapper = shallow(<SearchBar filter={filterSpy} />);
  });

  it('calls the spy on change', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    });
    expect(wrapper.state().value).toEqual(value);
    expect(filterSpy).toBeCalledWith(value);
  });
});
