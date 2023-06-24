import { NavItemsParams } from './interfaces';

export const NAV_ITEMS: NavItemsParams[] = [
  {
    id: 1,
    tag: 'HOME',
    title: 'HOME',
    path: '/',
    isDropDown: false,
  },
  {
    id: 2,
    tag: 'NEW ARRIVALS',
    title: 'NEW ARRIVALS',
    path: '/new',
    isDropDown: false,
  },
  {
    id: 3,
    tag: 'CATEGORIES',
    title: 'CATEGORIES ⬇',
    path: '/categories',
    isDropDown: true,
    downList: [
      {
        title: 'HIJAB',
        link: '/hijab',
      },
      {
        title: 'TOP',
        link: '/top',
      },
      {
        title: 'BOTTOM',
        link: '/bottom',
      },
      {
        title: 'DRESS',
        link: '/dress',
      },
      {
        title: 'SET',
        link: '/set',
      },
      {
        title: 'KNITWEAR',
        link: '/knitwear',
      },
      {
        title: 'PRAYERING SET',
        link: '/praying-set',
      },
    ],
  },
  {
    id: 4,
    tag: 'DEFECT SALE',
    title: 'DEFECT SALE🔥',
    path: '/defectsale',
    isDropDown: false,
  },
  {
    id: 5,
    tag: 'ALL PRODUCT',
    title: 'ALL PRODUCT',
    path: '/all',
    isDropDown: false,
  },
  {
    id: 6,
    tag: 'HOW TO ORDER',
    title: 'HOW TO ORDER',
    path: '/howtoorder',
    isDropDown: false,
  },
];
