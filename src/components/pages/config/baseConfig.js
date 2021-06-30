import _ from 'lodash';

class BaseConfig {
  static get config() {
    return {};
  }

  static mapPageSet(pageGroup, cb) {
    const pageGroupData = _.get(this.config, pageGroup, this.config.default);
    const { attributes, navigation } = pageGroupData;
    return _.map(navigation, (page, index) => cb(attributes[page], page, index));
  }

  static isFooterPresent(pageGroup) {
    const pageSetData = _.get(this.config, pageGroup);
    return _.get(pageSetData, 'footer', true);
  }

  static getDefaultPage(pageGroup) {
    const pageSetData = _.get(this.config, pageGroup);
    return _.get(pageSetData, 'default');
  }

  static get defaultGroup() {
    return _.get(this.config, 'default');
  }

  static getComponent(pageGroup, page) {
    const pageSetData = _.get(this.config, pageGroup);
    const { attributes } = pageSetData;
    const pageData = _.get(attributes, page);

    return _.get(pageData, 'component');
  }
}

export default BaseConfig;
