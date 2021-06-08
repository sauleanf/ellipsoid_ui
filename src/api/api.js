import _ from 'lodash';
import axios from 'axios';
import { GET, POST, PUT } from './methods';

class ApiClient {
  static get Schema() { return null; }

  static retrieveHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  static get endpoint() {
    return `${process.env.API}/api/v1/${this.Schema.type}s`;
  }

  // API BELOW

  static async request({
    params,
    id,
    endpoint = this.endpoint,
    requestData,
    method = GET,
  } = {}) {
    const headers = this.retrieveHeaders();
    const serializedParams = this.Schema.serializeData(params);
    const serializedRequestData = this.Schema.serializeData(requestData);
    const url = _.isNull(id) ? endpoint : _.join([endpoint, id], '/');

    const res = await axios({
      url,
      method,
      params: serializedParams,
      data: serializedRequestData,
      headers,
    });

    const { data } = res;
    if (_.has(data, 'items')) {
      data.items = this.Schema.deserializeList(data.items);
    } else if (_.has(data, 'item')) data.item = this.Schema.deserializeItem(data.item);

    return data;
  }

  static index(params) {
    return this.request({
      params,
    });
  }

  static show(id) {
    return this.request({
      id,
    });
  }

  static create(requestData) {
    return this.request({
      method: POST,
      requestData,
    });
  }

  static async update(id, requestData) {
    return this.request({
      id,
      method: PUT,
      requestData,
    });
  }

  static get schema() {
    return this.Schema.schema;
  }
}

export default ApiClient;
