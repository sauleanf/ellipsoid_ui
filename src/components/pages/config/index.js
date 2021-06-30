import config from './base';
import BaseConfig from './baseConfig';

class PageConfig extends BaseConfig {
  static get config() {
    return config;
  }
}

export default PageConfig;
