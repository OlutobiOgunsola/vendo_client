import Profile1 from '@/assets/images/user/ProfilePhotos/Profile1.jpg';
import Profile2 from '@/assets/images/user/ProfilePhotos/Profile2.jpg';
import Profile3 from '@/assets/images/user/ProfilePhotos/Profile3.jpg';
import Profile4 from '@/assets/images/user/ProfilePhotos/Profile4.jpg';
import Background1 from '@/assets/images/user/backgrounds/Background1.jpg';
import Background2 from '@/assets/images/user/backgrounds/Background2.jpg';
import Background3 from '@/assets/images/user/backgrounds/Background3.jpg';
import Background4 from '@/assets/images/user/backgrounds/Background4.jpg';

const storesArray = [
  {
    id: 1,
    photo: Profile1,
    name: 'Trident Stores',
    platform: 'twitter',
    address: '@trident_stores',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      4,
      1,
      4,
      2,
      5,
      2,
      2,
      1,
      3,
      1,
      4,
      4,
      4,
      4,
      5,
      1,
      2,
      1,
      4,
      3,
      1,
      5,
      1,
      4,
      2,
      2,
      3,
      1,
      5,
      1,
      2,
      2,
      1,
      4,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      5,
      2,
      4,
      4,
      1,
      2,
      2,
      4,
      2,
      3,
      1,
      2,
      5,
      2,
      3,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,
      5,
      5,
      2,
      3,
      4,
      1,
      1,
      4,
      1,
      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
      },
    ],
  },
  {
    id: 2,
    photo: Profile2,
    name: 'Drenthe',
    platform: 'instagram',
    address: '@the_drenthe',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      4,
      1,
      4,
      2,
      5,
      2,
      2,
      1,
      3,
      1,
      4,
      4,
      4,
      4,
      5,
      1,
      4,
      2,
      1,
      5,
      1,
      4,
      2,
      2,
      3,
      1,
      5,
      1,
      2,
      2,
      1,
      4,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
  {
    id: 3,
    photo: Profile3,
    name: 'IJAOLA MULTISTORES',
    platform: 'facebook',
    address: '@ijaola_multistores',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      4,
      2,
      4,
      2,
      4,
      1,
      1,
      5,
      1,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
  {
    id: 4,
    photo: Profile4,
    name: 'simple local',
    platform: 'local',
    address: '',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      4,
      2,
      4,
      2,
      4,
      1,
      1,
      5,
      1,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
  {
    id: 5,
    photo: Background1,
    name: 'Trident Stores',
    platform: 'twitter',
    address: '@trident_stores',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      4,
      1,
      4,
      2,
      5,
      2,
      2,
      1,
      3,
      1,
      4,
      4,
      4,
      4,
      5,
      1,
      2,
      1,
      4,
      3,
      1,
      5,
      1,
      4,
      2,
      2,
      3,
      1,
      5,
      1,
      2,
      2,
      1,
      4,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      5,
      2,
      4,
      4,
      1,
      2,
      2,
      4,
      2,
      3,
      1,
      2,
      5,
      2,
      3,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,
      5,
      5,
      2,
      3,
      4,
      1,
      1,
      4,
      1,
      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
      },
    ],
  },
  {
    id: 6,
    photo: Background2,
    name: 'Drenthe',
    platform: 'instagram',
    address: '@the_drenthe',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      4,
      1,
      4,
      2,
      5,
      2,
      2,
      1,
      3,
      1,
      4,
      4,
      4,
      4,
      5,
      1,
      4,
      2,
      1,
      5,
      1,
      4,
      2,
      2,
      3,
      1,
      5,
      1,
      2,
      2,
      1,
      4,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        photo: Background3,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
  {
    id: 7,
    name: 'IJAOLA MULTISTORES',
    platform: 'facebook',
    address: '@ijaola_multistores',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      4,
      2,
      4,
      2,
      4,
      1,
      1,
      5,
      1,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
  {
    id: 8,
    photo: Background4,
    name: 'simple local',
    platform: 'local',
    address: '',
    ratings: [
      3,
      5,
      5,
      1,
      4,
      2,
      0,
      1,
      3,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      4,
      2,
      4,
      2,
      4,
      1,
      1,
      5,
      1,
      5,
      2,
      5,
      2,
      4,
      2,
      3,
      1,
      5,
      1,
      2,
      1,
      4,
      4,
      1,
      1,
      4,
      4,
      3,
      4,
      3,
      3,
      5,
      3,
      5,
      2,
      3,
      1,
      2,
      2,
      1,
      5,
      2,
      4,
      2,
      5,
      2,
      4,
      2,
      2,
      1,
      4,
      1,
      4,
      4,
      2,

      3,
      2,
    ],
    reviews: [
      {
        id: 1,
        text: 'he is a nice guyist',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
      {
        id: 2,
        text: 'he is a nice guyerer',
        author: 'Jennifer',
        author_id: 2,
        recipient_id: 1,
      },
      {
        id: 3,
        text: 'he is a nice guyer',
        author: 'Adenike',
        author_id: 3,
        recipient_id: 1,
      },
      {
        id: 4,
        text: 'he is a nice guyman',
        author: 'Lancreasot',
        author_id: 1,
        recipient_id: 1,
      },
    ],
  },
];

export default storesArray;