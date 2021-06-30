import mapConfig from '../map/config';
import loginConfig from '../login/config';
import registrationConfig from '../registration/config';
import registrationCompletedConfig from '../registrationCompleted/config';
import profileConfig from '../profile/config';
import loadingConfig from '../loading/config';
import feedConfig from '../feed/config';
import groups from './groups';

export default {
  groups,
  [groups.AUTH]: {
    attributes: {
      map: mapConfig,
      feed: feedConfig,
      profile: profileConfig,
    },
    navigation: [
      'map',
      'feed',
      'profile',
    ],
    default: 'map',
  },
  [groups.DEFAULT]: {
    attributes: {
      map: mapConfig,
      login: loginConfig,
      registrationCompleted: registrationCompletedConfig,
      registration: registrationConfig,
    },
    navigation: [
      'map',
      'login',
    ],
    default: 'map',
  },
  [groups.LOADING]: {
    attributes: {
      loading: loadingConfig,
    },
    default: 'loading',
    footer: false,
  },
  default: 'loading',
};
