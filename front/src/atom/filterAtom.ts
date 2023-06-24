import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { FilterModalParams, DetailItemParams } from '../utils/interfaces';

const { persistAtom } = recoilPersist();

export const filterTitle = atom<string[]>({
  key: 'filterTagState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const filterModal = atom<FilterModalParams>({
  key: 'filterModalHandler',
  default: {
    isVisible: false,
    filterKeys: ['cost', 'size', 'popular'],
  },
});

export const detailModal = atom<Partial<DetailItemParams>>({
  key: 'detailModalHandler',
  default: {
    isVisible: false,
  },
});
