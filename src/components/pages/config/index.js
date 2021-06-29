import _ from 'lodash';
import config from './base';

class PageConfig {
  static mapPageSet(pageSet, cb) {
    const pageSetData = _.get(config, pageSet, config.default);
    const { navigation } = pageSetData;
    const { attributes } = pageSetData;
    return _.map(navigation, (page) => cb(attributes[page], page));
  }

  static isFooterPresent(pageGroup) {
    const pageSetData = _.get(config, pageGroup);
    return _.get(pageSetData, 'footer', true);
  }

  static getDefaultPage(pageGroup) {
    const pageSetData = _.get(config, pageGroup);
    return _.get(pageSetData, 'default');
  }

  static get defaultGroup() {
    return _.get(config, 'default');
  }

  static getComponent(pageGroup, page) {
    const pageSetData = _.get(config, pageGroup);
    const { attributes } = pageSetData;
    const pageData = _.get(attributes, page);

    return _.get(pageData, 'component');
  }
}

export default PageConfig;
