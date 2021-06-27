import MapPage from "../MapPage";
import FeedPage from "../FeedPage";
import ProfilePage from "../ProfilePage";
import LoginPage from "../LoginPage";
import RegistrationCompletedPage from "../RegistrationCompletedPage";
import RegistrationPage from "../RegistrationPage";
import LoadingPage from "../LoadingPage";

export default {
  authenticated: {
    attributes: {
      map: {
        component: MapPage,
        text: 'Map',
        icon: 'fa-map',
      },
      feed: {
        component: FeedPage,
        text: 'Feed',
        icon: 'fa-rss',
      },
      profile: {
        component: ProfilePage,
        text: 'Profile',
        icon: 'fa-user',
      },
    },
    navigation: [
      'map',
      'feed',
      'profile',
    ],
    default: 'map',
  },
  normal: {
    attributes: {
      map: {
        component: MapPage,
        text: 'Map',
        icon: 'fa-map',
      },
      login: {
        component: LoginPage,
        text: 'Sign In',
        icon: 'fa-user',
      },
      registrationCompleted: {
        component: RegistrationCompletedPage,
      },
      registration: {
        component: RegistrationPage,
      },
    },
    navigation: [
      'map',
      'login',
    ],
    default: 'map',
  },
  loading: {
    attributes: {
      loading: {
        component: LoadingPage,
        text: 'Sign In',
        icon: 'fa-user',
      },
    },
    default: 'loading',
    footer: false,
  },
  default: 'loading',
};