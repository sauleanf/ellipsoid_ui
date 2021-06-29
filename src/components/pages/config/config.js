import mapSet from '../map/map';
import loginSet from '../login/login';
import registrationSet from '../registration/registration';
import registrationCompletedSet from '../registrationCompleted/registrationCompleted';
import profileSet from '../profile/profile';
import loadingSet from '../loading/loading';
import feedSet from '../feed/feed';
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
