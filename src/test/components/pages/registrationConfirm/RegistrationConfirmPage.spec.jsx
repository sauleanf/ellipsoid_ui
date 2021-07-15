import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../../../reducers';
import RegistrationConfirmPage from '../../../../components/pages/registrationConfirm/RegistrationConfirmPage';
import { PagesActions, RegistrationsActions } from '../../../../actions';
import { mockAction } from '../../../actions/actions.helpers';
import { registration } from '../../../fixtures';
import { pages } from '../../../../components/pages/config/constants';

describe('RegistrationConfirmPage', () => {
  let wrapper;
  let store;
  let pageSpy;
  let updateRequestSpy;
  const { item } = registration;
  const showPayload = {
    item,
  };
  const updatePayload = {
    item: {
      ...item,
      activated: true,
    },
  };
  const code = '123456';

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    pageSpy = mockAction(PagesActions, 'clearAndPushPage');

    jest.spyOn(RegistrationsActions.Api, 'show')
      .mockImplementation(async () => showPayload);

    updateRequestSpy = jest.spyOn(RegistrationsActions.Api, 'update')
      .mockImplementation(async () => updatePayload);

    store.dispatch(RegistrationsActions.get());

    wrapper = mount(
      <Provider store={store}>
        <RegistrationConfirmPage />
      </Provider>,
    );
  });

  describe('Entering code', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('[data-testid="code-form-input-field"] input').simulate('change', {
        target: {
          value: code,
        },
      });
      await wrapper.find('[data-testid="code-form-submit-btn"] button').simulate('click');

      expect(pageSpy).toHaveBeenCalledWith(pages.REGISTRATION_COMPLETED);
      expect(updateRequestSpy).toHaveBeenCalledWith(item.id, { code });
    });
  });
});
