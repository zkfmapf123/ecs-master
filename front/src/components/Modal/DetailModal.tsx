import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { detailModal } from '../../atom/filterAtom';
import { v4 as uuidv4 } from 'uuid';
import { BucketItemParamas, BucketParams, DetailItemParams } from '../../utils/interfaces';
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  ThumbnailImage,
  ModalInfo,
  CloseBtnWrapper,
  CloseButton,
  ModalHeader,
  ModalTitle,
  CartQuantity,
  TableDescription,
  Table,
  TableRow,
  TableHeader,
  TableData,
  ColorButton,
  SizeButton,
  ModalDescription,
  ColorsContainer,
  ColorSpan,
  SizesContainer,
  SizeSpan,
  QuantityContainer,
  QuantityLabel,
  QuantityButton,
  QuantityValue,
  AddButtonContainer,
  AddToButton,
} from './DetailModal.styles';
import { bucketModal, userBucket } from '../../atom/bucketAtom';

interface DetailModalProps {
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ onClose }) => {
  const [detailModalState, setDetailModalState] = useRecoilState<Partial<DetailItemParams>>(detailModal);
  const [userBucketState, setUserBucketState] = useRecoilState<BucketParams>(userBucket);
  const [bucketModalState, setBucketModalState] = useRecoilState(bucketModal);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState({
    color: '',
    size: '',
    quantity: 0,
  });
  console.log('bucketModal', bucketModalState);

  useEffect(() => {
    setSelectedItems({
      color: selectedColor || '',
      size: selectedSize || '',
      quantity: quantity || 0,
    });
  }, [selectedColor, selectedSize, quantity]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
  const handleCartButton = (e: React.MouseEvent<HTMLButtonElement>, name = 'JaeHyuk') => {
    if (!selectedItems.size || !selectedItems.color || selectedItems.quantity === 0) {
      alert('Please check all of the options ');
      return;
    }

    const updatedSelectedItem: BucketItemParamas = {
      uuid: uuidv4(),
      id: Number(detailModalState.id),
      name: String(detailModalState.name),
      quantity,
      size: selectedItems.size,
      color: String(selectedItems.color),
    };
    setSelectedItems(updatedSelectedItem);

    if (!userBucketState[name]) {
      setUserBucketState({
        ...userBucketState,
        [name]: [updatedSelectedItem],
      });
    } else {
      setUserBucketState({
        ...userBucketState,
        [name]: [...userBucketState[name], updatedSelectedItem],
      });
    }

    alert('The product has been successfully added to your shopping cart.');

    setDetailModalState({
      ...detailModalState,
      isVisible: false,
    });
    setBucketModalState({
      isVisible: true,
    });
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ThumbnailImage src={detailModalState.thumbnail} alt={detailModalState.name} />
          <ModalInfo>
            <CloseBtnWrapper>
              <CloseButton onClick={onClose}>X</CloseButton>
            </CloseBtnWrapper>
            <ModalHeader>
              <ModalTitle>Name: {detailModalState.name}</ModalTitle>
              <CartQuantity>Cart {quantity}</CartQuantity>
            </ModalHeader>
            <TableDescription>
              <p>Description: {detailModalState.desc}</p>
              <Table>
                <tbody>
                  <TableRow>
                    <TableHeader>Price</TableHeader>
                    <TableData>
                      {detailModalState.currency}
                      {detailModalState.price}
                    </TableData>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Colors</TableHeader>
                    <TableData>
                      {detailModalState.attribute?.colors?.map((color) => (
                        <ColorButton
                          key={color}
                          onClick={() => handleColorClick(color)}
                          isSelected={selectedColor === color}
                        >
                          {color}
                        </ColorButton>
                      ))}
                    </TableData>
                  </TableRow>
                  <TableRow>
                    <TableHeader>Sizes</TableHeader>
                    <TableData>
                      {detailModalState.attribute?.sizes?.map((size) => (
                        <SizeButton key={size} onClick={() => handleSizeClick(size)} isSelected={selectedSize === size}>
                          {size}
                        </SizeButton>
                      ))}
                    </TableData>
                  </TableRow>
                </tbody>
              </Table>
            </TableDescription>
            <ModalDescription>
              <ColorsContainer></ColorsContainer>
              <SizesContainer></SizesContainer>
            </ModalDescription>
            <QuantityContainer>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
              <QuantityValue>{quantity}</QuantityValue>
              <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
            </QuantityContainer>
            <AddButtonContainer>
              <AddToButton isSelected={selectedItems !== null} onClick={(e) => handleCartButton(e)}>
                Add to cart
              </AddToButton>
            </AddButtonContainer>
          </ModalInfo>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};
