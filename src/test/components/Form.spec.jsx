import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import Form from '../../components/Form';

describe('Form', () => {
  let wrapper;
  let store;

  const text = 'text here';
  const title = 'lorem ipsum';
  const description = 'ego sum magnus';

  const formFields = [{
    name: 'email',
    label: 'Email',
    icon: 'fa-user',
  }, {
    name: 'password',
    label: 'Password',
    icon: 'fa-lock',
    protected: true,
  }];

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );
    wrapper = mount(
      <Provider store={store}>
        <Form
          fields={formFields}
          text={text}
          title={title}
          description={description}
        />
      </Provider>,
    );
  });

  it('renders the text props', () => {
    expect(wrapper.find('.form-title').text()).toEqual(title);
    expect(wrapper.find('.form-description').text()).toEqual(description);
    expect(wrapper.find('.form-btn-container').text()).toEqual(text);
  });
});
