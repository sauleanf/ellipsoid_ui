import _ from 'lodash';
import axios from 'axios';
import {
  GET,
  POST,
  PUT,
} from '../../api/methods';

export const mockRequest = (url, method, response, token = '') => {
  axios.mockImplementation((data) => {
    if (!_.isEmpty(token) && data.headers.Authorization !== `Bearer ${token}`) {
      throw Promise.reject(new Error({
        error: 'authentication failed',
      }));
    }

    if (data.method === method && data.url === url) {
      return Promise.resolve({
        data: response,
      });
    }

    throw Promise.reject(new Error({
      error: 'url is invalid',
    }));
  });
};

export const testIndex = ({
  Api,
  url,
  raw,
  item,
  token,
}) => {
  describe('index', () => {
    beforeEach(() => {
      mockRequest(url, GET, {
        items: [raw],
        page: 1,
        count: 3,
      }, token);
    });

    it('returns the appropriate data', async () => {
      const data = await Api.index();
      expect(data).toEqual({
        items: [item],
        page: 1,
        count: 3,
      });
    });
  });
};

export const testShow = ({
  Api,
  url,
  raw,
  item,
  token,
}) => {
  describe('show', () => {
    beforeEach(() => {
      mockRequest(`${url}/${raw.id}`, GET, {
        item: raw,
      }, token);
    });

    it('returns the appropriate data', async () => {
      const data = await Api.show(raw.id);
      expect(data).toEqual({
        item,
      });
    });
  });
};

export const testCreate = ({
  Api,
  url,
  raw,
  item,
  requestData,
  token,
}) => {
  describe('create', () => {
    beforeEach(() => {
      mockRequest(url, POST, {
        item: raw,
      }, token);
    });

    it('returns the appropriate data', async () => {
      const data = await Api.create(requestData);
      expect(data).toEqual({
        item,
      });
    });
  });
};

export const testUpdate = ({
  Api,
  url,
  raw,
  item,
  requestData,
  token,
}) => {
  describe('update', () => {
    beforeEach(() => {
      mockRequest(url + raw.id, PUT, {
        item: raw,
      }, token);
    });

    it('returns the appropriate data', async () => {
      const data = await Api.update(raw.id, requestData);
      expect(data).toEqual({
        item,
      });
    });
  });
};
