import mapSet from './types/map';
import loginSet from './types/login';
import registrationSet from './types/registration';
import registrationCompletedSet from './types/registrationCompleted';
import profileSet from './types/profile';
import loadingSet from './types/loading';
import feedSet from './types/feed';

const groups = {
  AUTH: 'authenticated',
  DEFAULT: 'normal',
  LOADING: 'loading',
};

export default {
  groups,
  [groups.AUTH]: {
    attributes: {
      map: mapSet,
      feed: feedSet,
      profile: profileSet,
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
      map: mapSet,
      login: loginSet,
      registrationCompleted: registrationCompletedSet,
      registration: registrationSet,
    },
    navigation: [
      'map',
      'login',
    ],
    default: 'map',
  },
  [groups.LOADING]: {
    attributes: {
      loading: loadingSet,
    },
    default: 'loading',
    footer: false,
  },
  default: 'loading',
};
