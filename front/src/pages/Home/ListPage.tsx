import { useRecoilState } from 'recoil';
import HomeTemplate from '../../containers/Home/HomeTemplate';
import { detailModal } from '../../atom/filterAtom';
import { DetailModal } from '../../components/Modal/DetailModal';
import { DetailItemParams } from '../../utils/interfaces';
import { bucketModal } from '../../atom/bucketAtom';
import BucketModal from '../../components/Modal/BucketModal';

export default function ListPage() {
  const [detailModalState, setDetailModalState] = useRecoilState<Partial<DetailItemParams>>(detailModal);
  const [bucketModalState] = useRecoilState(bucketModal);
  const closeDetailModal = () => {
    setDetailModalState({
      ...detailModalState,
      isVisible: false,
    });
  };

  return (
    <>
      <HomeTemplate />
      {detailModalState.isVisible && <DetailModal onClose={closeDetailModal} />}
      {bucketModalState.isVisible && <BucketModal />}
    </>
  );
}
