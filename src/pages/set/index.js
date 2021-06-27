import _ from 'lodash';
import pageConfig from './pages';


class PageSets {
  static mapPageSet(pageSet, cb) {
    const pageSetData = _.get(pageConfig, pageSet, pageConfig.default);
    const { navigation } = pageSetData;
    const { attributes } = pageSetData;
    return _.map(navigation, (page) => cb(attributes[page], page));
  }

  static isFooterPresent(pageSet) {
    const pageSetData = _.get(pageConfig, pageSet);
    return _.get(pageSetData, 'footer', true);
  }

  static getPageData(pageSet, page) {
    const pageSetData = _.get(pageConfig, pageSet);

    const { attributes } = pageSetData;

    return _.get(attributes, page);
  }

  static getDefaultPage(pageSet) {
    const pageSetData = _.get(pageConfig, pageSet);
    return _.get(pageSetData, 'default');
  }

  static getDefaultPageSet() {
    return _.get(pageConfig, 'default');
  }

  static getComponent(pageSet, page) {
    const pageData = this.getPageData(pageSet, page);

    return _.get(pageData, 'component');
  }
}

export default PageSets;

