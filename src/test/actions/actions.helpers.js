import _ from 'lodash';

export const testGetAll = ({
  Actions,
  item,
}) => {
  describe('getAll', () => {
    const payload = {
      items: [item],
      page: 1,
      count: 1,
    };
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      jest.spyOn(Actions.Api, 'index').mockImplementation(async () => payload);
    });

    it('sends the right dispatch', async () => {
      const action = Actions.getAll();
      await action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {
        type: Actions.types.FETCHING,
      });
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {
        type: Actions.types.INDEX,
        payload,
      });
    });
  });
};

export const testGet = ({
  Actions,
  item,
}) => {
  describe('get', () => {
    let showSpy;
    let dispatchSpy;
    const payload = {
      item,
    };

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      showSpy = jest.spyOn(Actions.Api, 'show')
        .mockImplementation(async () => payload);
    });

    it('sends the right dispatch', async () => {
      const action = Actions.get(item.id);
      await action(dispatchSpy);

      expect(showSpy).toHaveBeenCalledWith(item.id);

      expect(dispatchSpy).toHaveBeenNthCalledWith(1, {
        type: Actions.types.FETCHING,
      });
      expect(dispatchSpy).toHaveBeenNthCalledWith(2, {
        type: Actions.types.SET,
        payload,
      });
    });
  });
};

export const testFilter = ({
  Actions,
  item,
  filterArgs,
}) => {
  describe('filter', () => {
    let indexSpy;
    let dispatchSpy;
    const payload = {
      items: [item],
      page: 1,
      count: 1,
    };

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      indexSpy = jest.spyOn(Actions.Api, 'index')
        .mockImplementation(async () => payload);
    });

    it('sends the right dispatch', async () => {
      const filterParam = _.values(filterArgs)[0];
      const action = Actions.filter(filterParam);
      await action(dispatchSpy);

      expect(indexSpy).toHaveBeenCalledWith(filterArgs);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: Actions.types.FILTER,
        payload,
      });
    });
  });
};
