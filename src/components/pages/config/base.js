import map from '../map/config';
import login from '../login/config';
import registration from '../registration/config';
import registrationCompleted from '../registrationCompleted/config';
import profile from '../profile/config';
import loading from '../loading/config';
import feed from '../feed/config';
import { pages, groups } from './constants';

const {
  MAP, FEED, LOADING, LOGIN, PROFILE,
} = pages;

export default {
  groups,
  [groups.AUTH]: {
    attributes: {
      map,
      feed,
      profile,
    },
    navigation: [
      MAP,
      FEED,
      PROFILE,
    ],
    default: MAP,
  },
  [groups.DEFAULT]: {
    attributes: {
      map,
      login,
      registrationCompleted,
      registration,
    },
    navigation: [
      MAP,
      LOGIN,
    ],
    default: map.name,
  },
  [groups.LOADING]: {
    attributes: {
      loading,
    },
    default: LOADING,
    footer: false,
  },
  default: LOADING,
};
