import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';
import { BucketModalParams, BucketParams } from '../utils/interfaces';

const { persistAtom } = recoilPersist();

export const userBucket = atom<BucketParams>({
  key: 'userBucket',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const bucketModal = atom<BucketModalParams>({
  key: 'bucketModal',
  default: {
    isVisible: false,
  },
});
