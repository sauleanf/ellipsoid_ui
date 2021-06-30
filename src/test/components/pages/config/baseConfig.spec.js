import BaseConfig from '../../../../components/pages/config/baseConfig';
import { Button, ButtonGroup, InputField } from '../../../../components/blocks';

describe('BaseConfig', () => {
  const groups = {
    ONE: 'group 1',
    TWO: 'group 2',
  };

  const pageOneConfig = {
    component: Button,
    text: 'Component One',
    icon: 'fa-rss',
  };

  const pageTwoConfig = {
    component: ButtonGroup,
    text: 'Component One',
    icon: 'fa-rss',
  };

  const pageThreeConfig = {
    component: InputField,
    text: 'Component One',
    icon: 'fa-rss',
  };

  const config = {
    groups,
    [groups.ONE]: {
      attributes: {
        pageOne: pageOneConfig,
        pageTwo: pageTwoConfig,
        pageThree: pageThreeConfig,
      },
      navigation: ['pageOne', 'pageThree'],
      default: 'pageOne',
      footer: true,
    },
    [groups.TWO]: {
      attributes: {
        pageThree: pageThreeConfig,

      },
      navigation: [],
      default: 'pageThree',
      footer: false,
    },
    default: groups.ONE,
  };

  class SubConfig extends BaseConfig {
    static get config() {
      return config;
    }
  }

  describe('mapPageSet', () => {
    it('maps over all the attributes in the group', () => {
      let numPageData = 0;
      SubConfig.mapPageSet(groups.ONE, (pageData, page, index) => {
        expect(config[groups.ONE].attributes[page]).toEqual(pageData);
        expect(index).toEqual(numPageData);
        numPageData += 1;
      });

      expect(numPageData).toEqual(2);
    });
  });

  describe('getComponent', () => {
    it('returns the component for a group and page', () => {
      expect(SubConfig.getComponent(groups.ONE, 'pageOne')).toEqual(Button);
    });
  });

  describe('defaultGroup', () => {
    it('returns the default group', () => {
      expect(SubConfig.defaultGroup).toEqual(groups.ONE);
    });
  });

  describe('getDefaultPage', () => {
    it('returns the default page for the group', () => {
      expect(SubConfig.getDefaultPage(groups.ONE)).toEqual('pageOne');
    });
  });

  describe('isFooterPresent', () => {
    it('returns true when the footer attribute is true', () => {
      expect(SubConfig.isFooterPresent(groups.ONE)).toBe(true);
    });

    it('returns false when the footer attribute is false', () => {
      expect(SubConfig.isFooterPresent(groups.TWO)).toBe(false);
    });
  });
});
