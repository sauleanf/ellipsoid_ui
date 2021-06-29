import _ from 'lodash';
import config from './config';

class PageConfig {
  static mapPageSet(pageSet, cb) {
    const pageSetData = _.get(config, pageSet, config.default);
    const { navigation } = pageSetData;
    const { attributes } = pageSetData;
    return _.map(navigation, (page) => cb(attributes[page], page));
  }

  static isFooterPresent(pageSet) {
    const pageSetData = _.get(config, pageSet);
    return _.get(pageSetData, 'footer', true);
  }

  static getDefaultPage(pageSet) {
    const pageSetData = _.get(config, pageSet);
    return _.get(pageSetData, 'default');
  }

  static getDefaultPageSet() {
    return _.get(config, 'default');
  }

  static getComponent(pageSet, page) {
    const pageSetData = _.get(config, pageSet);
    const { attributes } = pageSetData;
    const pageData = _.get(attributes, page);

    return _.get(pageData, 'component');
  }
}

export default PageConfig;
