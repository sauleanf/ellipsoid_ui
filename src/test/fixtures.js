import _ from 'lodash';
import moment from 'moment';

export const newspaper = {
  raw: {
    id: 'id1',
    name: 'New York Times',
    description: 'The New York Times is an American daily newspaper based in New York City with a worldwide readership.',
    link: 'https://www.nytime.com',
  },
  item: {
    id: 'id1',
    name: 'New York Times',
    description: 'The New York Times is an American daily newspaper based in New York City with a worldwide readership.',
    link: 'https://www.nytime.com',
  },
};

export const location = {
  raw: {
    id: 'id1',
    name: 'New York City',
    coordinates: [1, 2],
  },
  item: {
    id: 'id1',
    name: 'New York City',
    coordinates: [1, 2],
  },
};

export const log = {
  raw: {
    id: 'id1',
    message: 'the message of the worker',
    type: 'NEW_GENERIC_LOG',
    error: 'i am error',
    created_at: '2021-01-11T14:40:01.701127',
    finished_at: '2020-01-11T14:40:01.701127',
  },
  item: {
    id: 'id1',
    message: 'the message of the worker',
    type: 'NEW_GENERIC_LOG',
    error: 'i am error',
    createdAt: moment('2021-01-11T14:40:01.701127'),
    finishedAt: moment('2020-01-11T14:40:01.701127'),
  },
};

export const article = {
  raw: {
    id: 'id1',
    location: {
      id: 'id2',
      name: 'New York city',
      coordinates: [1, 3],
    },
    title: 'New Article',
    link: 'https://www.nytime.com/article',
    newspaper: {
      id: 'id3',
      name: 'New York Times',
      description: 'The New York Times is an American daily newspaper based in New York City with a worldwide readership.',
      link: 'https://www.nytime.com',
    },
    published_at: '2021-01-11T14:40:01.701127',
  },
  item: {
    id: 'id1',
    location: {
      id: 'id2',
      name: 'New York city',
      coordinates: [1, 3],
    },
    title: 'New Article',
    link: 'https://www.nytime.com/article',
    newspaper: {
      id: 'id3',
      name: 'New York Times',
      description: 'The New York Times is an American daily newspaper based in New York City with a worldwide readership.',
      link: 'https://www.nytime.com',
    },
    publishedAt: moment('2021-01-11T14:40:01.701127'),
  },
};

export const user = {
  raw: {
    id: 'id1',
    name: 'John Doe',
    username: 'johnd',
    email: 'john@gmail.com',
    profile_image: 'profile.img.com',
  },
  item: {
    id: 'id1',
    name: 'John Doe',
    username: 'johnd',
    email: 'john@gmail.com',
    profileImage: 'profile.img.com',
  },
};

export const registration = {
  raw: {
    id: 'id3',
    activated: false,
  },
  item: {
    id: 'id3',
    activated: false,
  },
};

export const createArticlesAndNewspapers = (newspaperNumber, articleNumber) => {
  const newspapers = _.map(_.range(0, newspaperNumber), (index) => ({
    id: `id${index}`,
    name: 'New York Times',
    description: 'The New York Times is an American daily newspaper based in New York City with a worldwide readership.',
    link: 'https://www.nytime.com',
  }));

  return _.map(newspapers, (newspaperObj) => {
    const articles = _.map(_.range(0, articleNumber), (index) => ({
      id: `${newspaperObj.id}-articleId${index}`,
      location: {
        id: 'id2',
        name: 'New York city',
        coordinates: [1, 3],
      },
      title: 'New Article',
      link: 'https://www.nytime.com/article',
      newspaper: newspaperObj,
      publishedAt: moment('2021-01-11T14:40:01.701127'),
    }));
    return {
      newspaper: newspaperObj,
      articles,
    };
  });
};
