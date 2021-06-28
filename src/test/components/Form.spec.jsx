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
  let submitSpy;

  const text = 'text';
  const title = 'title';
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
    submitSpy = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <Form
          fields={formFields}
          text={text}
          title={title}
          description={description}
          onSubmit={submitSpy}
        />
      </Provider>,
    );
  });

  it('renders the text props', () => {
    expect(wrapper.find('.form-title').text()).toEqual(title);
    expect(wrapper.find('.form-description').text()).toEqual(description);
    expect(wrapper.find('.form-btn-container').text()).toEqual(text);
  });

  describe('onSubmit', () => {
    const email = "john@email.com";
    const password = 'password2';
    it('clicking the onSubmit button triggers the prop', async () => {
      await wrapper.find('[data-testid="email-form-input-field"] input').simulate('change', {
        target: {
          value: email,
        },
      });

      await wrapper.find('[data-testid="password-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });

      await wrapper.find('[data-testid="title-form-submit-btn"] button').simulate('click');
      expect(submitSpy).toBeCalledWith({
        email,
        password,
      });
    });
  });
});
