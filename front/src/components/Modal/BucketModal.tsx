import { Link, useNavigate } from 'react-router-dom';
import {
  ModalActions,
  ContinueShoppingButton,
  GoToCartButton,
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  ModalTitle,
} from './BucketModal.style';
import { useRecoilState } from 'recoil';
import { bucketModal } from '../../atom/bucketAtom';

const AddedToCartModal = () => {
  const [bucketModalState, setBucketModalState] = useRecoilState(bucketModal);
  const navigate = useNavigate();

  const closeBucketModal = () => {
    setBucketModalState({
      ...bucketModalState,
      isVisible: false,
    });
  };

  const goToCart = () => {
    navigate(`/cartdetail`);
    closeBucketModal();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalTitle>Item Added to Cart</ModalTitle>
          <p>Your item has been successfully added to the shopping cart.</p>
        </ModalContent>
        <ModalActions>
          <ContinueShoppingButton onClick={closeBucketModal}>Continue Shopping</ContinueShoppingButton>
          <GoToCartButton onClick={goToCart}>Go to Cart</GoToCartButton>
        </ModalActions>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default AddedToCartModal;
