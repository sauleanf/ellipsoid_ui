import mapSet from '../map/config';
import loginSet from '../login/config';
import registrationSet from '../registration/config';
import registrationCompletedSet from '../registrationCompleted/config';
import profileSet from '../profile/config';
import loadingSet from '../loading/config';
import feedSet from '../feed/config';
import groups from './groups';

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
