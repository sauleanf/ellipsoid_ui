/* eslint-disable max-classes-per-file */
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

process.env.REACT_APP_API = 'localhost';

global.localStorage = new LocalStorageMock();

jest.mock('axios');

configure({ adapter: new Adapter() });

class SVGPathElement extends HTMLElement {}

window.SVGPathElement = SVGPathElement;
