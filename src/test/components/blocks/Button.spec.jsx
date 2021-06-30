import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../../components/blocks';

describe('Button', () => {
  let onClickSpy;
  let button;
  const buttonText = 'test btn 3';
  const event = 'event 5';

  beforeEach(() => {
    onClickSpy = jest.fn((e) => e);
    button = shallow(
      <Button onClick={onClickSpy}>
        {buttonText}
      </Button>,
    );
  });

  it('passes the buttonText as the children prop', () => {
    expect(button.text()).toEqual(buttonText);
  });

  it('passes the onClick as a prop', () => {
    expect(onClickSpy.mock.calls.length).toEqual(0);
    button.simulate('click', event);
    expect(onClickSpy).toHaveBeenCalledWith(event);
  });
});
